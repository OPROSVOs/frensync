#!/usr/bin/perl -w -T
#still requires the mysql but no apache
#the nice thing is that there is full control over the URL and "file extension" as it is all just a string in perl
package TestServer;

use strict;
use Data::Dumper;
local $Data::Dumper::Sortkeys = 1;
use base qw(Net::Server::HTTP); # any personality will do

require CGI;
require JSON;
require utf8;
require Encode;
require DBIx::Recordset;

TestServer->run(
                port => 8443,
                ipv => '4',
                host => '192.168.178.2',
                log_level => '1',
                log_file => '/var/log/perlserver',
                proto => 'ssl',
                SSL_key_file  => "../privkey.pem",
                SSL_cert_file => "../fullchain.pem",
                #chroot => "/srv", #buggy?
                user => "www-data",
                group => "www-data",
                #timeout_header => '5',
                #timeout_idle => '10',
                access_log_file => undef,
                );


sub process_http_request {
    my $self = shift;
    my $valid = 0;
    if($self->{request_info}->{request_path} =~ /^\/namesync/){
        print "Access-Control-Allow-Origin: https://boards.4chan.org\n";
        print "Access-Control-Allow-Credentials: true\n";
        print "Access-Control-Allow-Headers: x-requested-with, if-modified-since\n";
        foreach(@{$self->{request_info}->{request_headers}}){
           my ($k, $v) = @{$_};
           $valid++ if($k eq 'X-Requested-With' and $v =~ /^NameSync/);
           $valid++ if($k eq 'If-Modified-Since' and $v ge 0);
           $valid++ if($k eq 'Sec-Fetch-Site' and $v eq 'cross-site');
           $valid++ if($k eq 'Origin' and $v =~ /\:\/\/boards\.4chan.org$/);
           $valid++ if($k eq 'Sec-Fetch-Mode' and $v eq 'cors');
           $valid++ if($k eq 'Host' and $v =~ /^192\.168\./);
        }
        #if($valid gt 1){print "X-Valid: $valid\n"};
    }
    print "Content-type: text/html\n\n";
    ###### DOCUMENT START #######

    if($self->{request_info}->{request_path} =~ /^\/namesync/){
        if($self->{request_info}->{request_path} =~ /^\/namesync\/qp.php/ and $valid and $self->{request_info}->{request_method} eq 'GET'){
            #qp.php

            require CGI;
            my $f = {};my $q = CGI->new; $f->{$_} = $q->param($_) for $q->param; #for getting the POST data
            #print "\n\n";print STDERR Dumper($f);

            use JSON;
            use utf8;

            unless($f->{t} and $f->{b}){
                print "not implemented";return;
            }
            use DBIx::Recordset;
            my $set = DBIx::Recordset -> SetupObject  ({'!DataSource'           => 'dbi:mysql:ns:user=ns:password=nope',
                                        '!Table'              => 's',
                                        '!WriteMode'          => 0,
                                    }) ;

            $set -> Search ({t => $f->{t}, b=> $f->{b}});
            my @out = ();
            my $rec;
            while($rec = $set->Next()){
                my $o;
                $o->{n}=$rec->{n} if $rec->{n}; #written in the long form to quickly fix renaming a->b
                $o->{p}=$rec->{p} if $rec->{p};
                $o->{s}=$rec->{s} if $rec->{s};
                $o->{e}=$rec->{e} if $rec->{e};
                #$o->{t}=$rec->{t} if $rec->{t}; #t = "tripcode" and not "thread" :)
                utf8::decode($o->{n}) if $o->{n};
                push @out, \%{$o};
                #print STDERR Dumper($rec);
            }
             $set -> Disconnect();

            #print "ns works again\n";
            print encode_json(\@out);

        }elsif($self->{request_info}->{request_path} =~ /^\/namesync\/sp.php/ and $valid and $self->{request_info}->{request_method} eq 'POST'){
            #sp.php

            require CGI;
            my $f = {};my $q = CGI->new; $f->{$_} = $q->param($_) for $q->param;
            #print "\n\n";print STDERR Dumper($f);

            use JSON;
            use utf8;
            use Encode;
			
			#redefining is uneccessary
            my $thread     = $f->{t};
            my $post       = $f->{p};
            my $board      = $f->{b};
            my $name       = $f->{n};
            my $subject    = $f->{'s'};
            my $email      = $f->{e} ;

            return unless $board;
            unless ($board =~ /[A-Za-z]{1,8}/){
                return;;
            }
            unless ($thread =~ /[0-9]{1,32}/){
                return;
            }
            unless ($post =~ /[0-9]{1,32}/){
                return;
            }

            #tripcode hash function
            #de.osdn.net/projects/naniya/wiki/2chtrip
            my $msg;
            my $hp;
            if($name=~/([^\#]*)\#(.+)/){
                $msg = $1;
                $hp  = $2;
                my $change_salt = substr($hp, , 1) . "H"; #reformatting
                $change_salt =~ tr/\x3A-\x40\x5B-\x60\x00-\x2D\x7B-\xFF/A-Ga-f./; #replace every non valid char to .
                $hp=substr(crypt($hp, $change_salt), -10);
            }
            my $displayed_name = $msg;
            $displayed_name .= "!".$hp."" if $hp; #TODO: add trip/$hp as a field in the DB instead of adding it to the name
            $displayed_name = $name unless $displayed_name;
            #print STDERR "results in $displayed_name \n";
            if(length($displayed_name) lt 1 and length($subject) lt 1 and length($email) lt 1){
                print STDERR "no fields supplied ($name $hp $msg $subject $email)"; print STDERR "!!!!! 8 no fields";exit 1;
            }
            use DBIx::Recordset;
            #my $set;
            my $set = DBIx::Recordset -> SetupObject  ({'!DataSource'           => 'dbi:mysql:ns:user=ns:password=nope',
                                     '!Table'              => 's',
                                     '!WriteMode'          => 1,
                                    }) ;
            $set -> Search ({p => $post});
            #if($set->Next ne undef){
            #print OUT "Post already exists";$set -> Disconnect();exit 1; #throws an database error because the post id is unique 
            #}
            $set -> Insert ({p => $post, t => $thread, b => $board, n => $displayed_name, s => $subject, e => $email});

            $set -> Disconnect();

        }elsif($self->{request_info}->{request_path} =~ /^\/namesync\/rm.php/ and $valid and  $self->{request_info}->{request_method} eq 'POST'){
            #rm.php
            #not implemented yet
        }else{
            #http options / preflight requests go here. do nothing and only send the header.
        }
        return;
    }elsif($self->{request_info}->{request_path} =~ /favicon.ico/){
    return;
    }elsif($self->{request_info}->{request_path} =~ /robots.txt/){
        print "\n\r\nUser-agent: *\r\nDisallow: /";
        return;
    }elsif($self->{request_info}->{request_path} =~ /^\/(index.*)?$/){
        print q{
<!DOCTYPE html>
<html>
<head>
<title>Index</title>
</head>
</html>
        };
        return;
    }else{
        #print STDERR "404: " . $self->{request_info}->{request_path} . "\n";
        #screws with bots
        return;
    }

    print "\n\n";
    print STDERR "FALL THROUGH\n". Dumper($self->{request_info} );

}



1; #important for the package

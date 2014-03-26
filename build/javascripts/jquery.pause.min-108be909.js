/*
 * Pause jQuery plugin v0.1
 *
 * Copyright 2010 by Tobia Conforto <tobia.conforto@gmail.com>
 *
 * Based on Pause-resume-animation jQuery plugin by Joe Weitzel
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 2 of the License, or(at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 51
 * Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 */
!function(){function t(){return(new Date).getTime()}var n=jQuery,e="jQuery.pause",i=1,r=n.fn.animate,o={};n.fn.animate=function(s,u,a,h){var p=n.speed(u,a,h);return p.complete=p.old,this.each(function(){this[e]||(this[e]=i++);var u=n.extend({},p);r.apply(n(this),[s,n.extend({},u)]),o[this[e]]={run:!0,prop:s,opt:u,start:t(),done:0}})},n.fn.pause=function(){return this.each(function(){this[e]||(this[e]=i++);var r=o[this[e]];r&&r.run&&(r.done+=t()-r.start,r.done>r.opt.duration?delete o[this[e]]:(n(this).stop(),r.run=!1))})},n.fn.resume=function(){return this.each(function(){this[e]||(this[e]=i++);var s=o[this[e]];s&&!s.run&&(s.opt.duration-=s.done,s.done=0,s.run=!0,s.start=t(),r.apply(n(this),[s.prop,n.extend({},s.opt)]))})}}();
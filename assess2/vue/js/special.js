(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["special"],{1912:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home"},[s("assess-header"),e.isTeacher?s("livepoll-nav",{attrs:{qn:e.curqn},on:{selectq:e.selectQuestion,openq:e.openInput,closeq:e.closeInput,newversion:e.newVersion}}):e._e(),e.isTeacher&&e.curstate>0&&e.curqn>-1?s("div",{staticClass:"subheader"},[s("div",{staticStyle:{"flex-grow":"1"},attrs:{id:"livepoll_qsettings"}},[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showQuestion,expression:"showQuestion"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showQuestion)?e._i(e.showQuestion,null)>-1:e.showQuestion},on:{change:function(t){var s=e.showQuestion,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showQuestion=s.concat([o])):r>-1&&(e.showQuestion=s.slice(0,r).concat(s.slice(r+1)))}else e.showQuestion=i}}}),e._v("\n        "+e._s(e.$t("livepoll.show_question"))+"\n      ")]),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showResults,expression:"showResults"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showResults)?e._i(e.showResults,null)>-1:e.showResults},on:{change:function(t){var s=e.showResults,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showResults=s.concat([o])):r>-1&&(e.showResults=s.slice(0,r).concat(s.slice(r+1)))}else e.showResults=i}}}),e._v("\n        "+e._s(e.$t("livepoll.show_results"))+"\n      ")]),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showAnswers,expression:"showAnswers"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showAnswers)?e._i(e.showAnswers,null)>-1:e.showAnswers},on:{change:[function(t){var s=e.showAnswers,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showAnswers=s.concat([o])):r>-1&&(e.showAnswers=s.slice(0,r).concat(s.slice(r+1)))}else e.showAnswers=i},e.updateShowAnswers]}}),e._v("\n        "+e._s(e.showAnswersLabel)+"\n      ")])]),e.timelimit>0&&e.starttime>0?s("timer",{attrs:{end:e.starttime+e.timelimit,total:e.timelimit}}):e._e()],1):e._e(),!e.isTeacher&&e.curstate>0?s("div",[s("h2",[e._v("\n      "+e._s(e.$t("question_n",{n:e.curqn+1}))+"\n    ")])]):e._e(),s("div",{staticClass:"scrollpane"},[!e.isTeacher||0!==e.curstate&&-1!==e.curqn?e._e():s("livepoll-settings",{staticClass:"questionpane"}),!e.isTeacher&&e.curstate<2?s("div",{staticClass:"questionpane"},[e._v("\n      "+e._s(e.$t("livepoll.waiting"))+"\n    ")]):e._e(),e.curqn>=0&&(e.isTeacher&&e.curstate>0||!e.isTeacher&&e.curstate>1)?s("question",{directives:[{name:"show",rawName:"v-show",value:e.showQuestion,expression:"showQuestion"}],attrs:{qn:e.curqn,active:!0,state:e.curstate,seed:e.curseed}}):e._e(),e.isTeacher?s("livepoll-results",{attrs:{showresults:e.showResults&&e.curstate>1,showans:4===e.curstate,qn:e.curqn}}):e._e()],1)],1)},i=[],o=s("5176"),r=s.n(o),a=s("e814"),l=s.n(a),u=(s("cadf"),s("551c"),s("f751"),s("097d"),s("97cd")),c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"subheader"},[s("div",{staticClass:"flexrow",staticStyle:{"flex-grow":"1"}},[s("menu-button",{attrs:{id:"qnav",options:e.navOptions,selected:e.dispqn,searchby:"dispqn"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.option;return[e._v("\n        "+e._s(s.title)+"\n      ")]}}])}),e.showNextPrev?s("button",{staticClass:"secondarybtn",attrs:{disabled:e.dispqn<=0,id:"qprev","aria-label":e.$t("previous")},on:{click:function(t){return e.selectQuestion(e.dispqn-1)}}},[s("icons",{attrs:{name:"left"}})],1):e._e(),e.showNextPrev?s("button",{staticClass:"secondarybtn",attrs:{disabled:e.dispqn>=e.navOptions.length-1,id:"qnext","aria-label":e.$t("next")},on:{click:function(t){return e.selectQuestion(e.dispqn+1)}}},[s("icons",{attrs:{name:"right"}})],1):e._e()],1),s("div",{staticStyle:{"flex-grow":"1"}},[2===e.curstate&&e.dispqn>0?s("button",{staticClass:"primary",on:{click:e.closeQuestion}},[e._v("\n      "+e._s(e.$t("livepoll.close_input"))+"\n    ")]):e.curstate>0&&e.dispqn>0?s("button",{staticClass:"primary",on:{click:e.openQuestion}},[e._v("\n      "+e._s(e.$t("livepoll.open_input"))+"\n    ")]):e._e(),e.curstate>2&&e.dispqn>0?s("button",{staticClass:"secondary",on:{click:e.newVersion}},[s("icons",{attrs:{name:"retake"}}),e._v("\n      "+e._s(e.$t("livepoll.new_version"))+"\n    ")],1):e._e()]),s("div",[e._v("\n    "+e._s(e.studentCount)+"\n  ")])])},h=[],p=s("a4bb"),d=s.n(p),v=s("ad76"),f=s("f05b"),w=s("6081"),m={name:"LivepollNav",props:["qn"],components:{MenuButton:v["a"],Icons:f["a"]},computed:{navOptions:function(){var e=this,t=[];t.push({onclick:function(){return e.$emit("selectq",0)},title:this.$t("livepoll.settings"),dispqn:0});var s=function(s){var n=l()(s)+1;t.push({onclick:function(){return e.$emit("selectq",n)},title:e.$t("question_n",{n:n}),dispqn:n})};for(var n in w["b"].assessInfo.questions)s(n);return t},showNextPrev:function(){return d()(this.navOptions).length>1},dispqn:function(){return l()(this.qn)+1},curstate:function(){return w["b"].assessInfo.livepoll_status.curstate},studentCount:function(){return this.$tc("livepoll.stucnt",w["b"].livepollStuCnt)}},methods:{selectQuestion:function(e){this.$emit("selectq",e)},openQuestion:function(){this.$emit("openq")},closeQuestion:function(){this.$emit("closeq")},newVersion:function(){this.$emit("newversion")}}},y=m,b=(s("4204"),s("2877")),q=Object(b["a"])(y,c,h,!1,null,null,null),_=q.exports,g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h2",[e._v(e._s(e.$t("livepoll.settings")))]),s("p",[s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showQuestionDefault,expression:"showQuestionDefault"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showQuestionDefault)?e._i(e.showQuestionDefault,null)>-1:e.showQuestionDefault},on:{change:function(t){var s=e.showQuestionDefault,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showQuestionDefault=s.concat([o])):r>-1&&(e.showQuestionDefault=s.slice(0,r).concat(s.slice(r+1)))}else e.showQuestionDefault=i}}}),e._v("\n      "+e._s(e.$t("livepoll.show_question_default"))+"\n    ")]),s("br"),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showResultsLiveDefault,expression:"showResultsLiveDefault"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showResultsLiveDefault)?e._i(e.showResultsLiveDefault,null)>-1:e.showResultsLiveDefault},on:{change:function(t){var s=e.showResultsLiveDefault,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showResultsLiveDefault=s.concat([o])):r>-1&&(e.showResultsLiveDefault=s.slice(0,r).concat(s.slice(r+1)))}else e.showResultsLiveDefault=i}}}),e._v("\n      "+e._s(e.$t("livepoll.show_results_live_default"))+"\n    ")]),s("br"),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showResultsAfter,expression:"showResultsAfter"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showResultsAfter)?e._i(e.showResultsAfter,null)>-1:e.showResultsAfter},on:{change:function(t){var s=e.showResultsAfter,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showResultsAfter=s.concat([o])):r>-1&&(e.showResultsAfter=s.slice(0,r).concat(s.slice(r+1)))}else e.showResultsAfter=i}}}),e._v("\n      "+e._s(e.$t("livepoll.show_results_after"))+"\n    ")]),s("br"),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.showAnswersAfter,expression:"showAnswersAfter"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.showAnswersAfter)?e._i(e.showAnswersAfter,null)>-1:e.showAnswersAfter},on:{change:function(t){var s=e.showAnswersAfter,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.showAnswersAfter=s.concat([o])):r>-1&&(e.showAnswersAfter=s.slice(0,r).concat(s.slice(r+1)))}else e.showAnswersAfter=i}}}),e._v("\n      "+e._s(e.$t("livepoll.show_answers_after"))+"\n    ")]),s("br"),s("label",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.useTimer,expression:"useTimer"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.useTimer)?e._i(e.useTimer,null)>-1:e.useTimer},on:{change:function(t){var s=e.useTimer,n=t.target,i=!!n.checked;if(Array.isArray(s)){var o=null,r=e._i(s,o);n.checked?r<0&&(e.useTimer=s.concat([o])):r>-1&&(e.useTimer=s.slice(0,r).concat(s.slice(r+1)))}else e.useTimer=i}}}),e._v("\n      "+e._s(e.$t("livepoll.use_timer"))+"\n    ")]),s("span",{directives:[{name:"show",rawName:"v-show",value:e.useTimer,expression:"useTimer"}]},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.questionTimelimit,expression:"questionTimelimit"}],attrs:{type:"text",size:"3"},domProps:{value:e.questionTimelimit},on:{input:function(t){t.target.composing||(e.questionTimelimit=t.target.value)}}}),e._v("\n      "+e._s(e.$t("livepoll.seconds"))+"\n    ")])])])},A=[],x={name:"LivepollSettings",computed:{showQuestionDefault:{set:function(e){this.$set(w["b"].livepollSettings,"showQuestionDefault",e)},get:function(){return w["b"].livepollSettings.showQuestionDefault}},showResultsLiveDefault:{set:function(e){this.$set(w["b"].livepollSettings,"showResultsLiveDefault",e)},get:function(){return w["b"].livepollSettings.showResultsLiveDefault}},showResultsAfter:{set:function(e){this.$set(w["b"].livepollSettings,"showResultsAfter",e)},get:function(){return w["b"].livepollSettings.showResultsAfter}},showAnswersAfter:{set:function(e){this.$set(w["b"].livepollSettings,"showAnswersAfter",e)},get:function(){return w["b"].livepollSettings.showAnswersAfter}},useTimer:{set:function(e){this.$set(w["b"].livepollSettings,"useTimer",e)},get:function(){return w["b"].livepollSettings.useTimer}},questionTimelimit:{set:function(e){this.$set(w["b"].livepollSettings,"questionTimelimit",e)},get:function(){return w["b"].livepollSettings.questionTimelimit}}}},k=x,I=Object(b["a"])(k,g,A,!1,null,null,null),P=I.exports,T=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.qinfo.answeights?s("div",[s("p",[e._v(e._s(e.$tc("livepoll.numresults",e.numResults)))]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showresults,expression:"showresults"}]},e._l(e.results,function(t,n){return s("div",{key:n,staticClass:"med-below"},[t.hasOwnProperty("choices")?s("livepoll-results-choices",{attrs:{results:t,showans:e.showans}}):s("livepoll-results-general",{attrs:{results:t,showans:e.showans,itemid:e.qn+"-"+n}})],1)}),0)]):e._e()},R=[],$=s("f499"),S=s.n($),L=(s("55dd"),s("c5f6"),s("a481"),s("4917"),s("6b54"),s("28a5"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("table",{staticClass:"LPres"},[s("thead",[s("tr",[s("th",[e._v(e._s(e.$t("livepoll.answer")))]),s("th",{staticStyle:{"min-width":"10em"}},[e._v(e._s(e.$t("livepoll.frequency")))])])]),s("tbody",e._l(e.results.choices,function(t,n){return s("tr",{key:n,class:[e.showans?e.results.scoredata[n]>0?"LPshowcorrect":"LPshowwrong":""]},[s("td",[e._v(e._s(t))]),s("td",[s("span",{staticClass:"LPresbarwrap"},[s("span",{staticClass:"LPresbar",style:{width:Math.round(100*e.results.datatots[n]/e.results.maxfreq)+"%"}},[s("span",{staticClass:"LPresval"},[e._v(e._s(e.results.datatots[n]))])])])])])}),0)])}),C=[],O={name:"LivepollResultsChoices",props:["results","showans"],methods:{onUpdate:function(){var e=this;this.$nextTick(function(){setTimeout(window.drawPics,100),window.rendermathnode(e.$refs.main)})}},mounted:function(){this.onUpdate()},watch:{results:function(e,t){this.onUpdate()}}},N=O,E=Object(b["a"])(N,L,C,!1,null,null,null),Q=E.exports,D=function(){var e=this,t=e.$createElement,s=e._self._c||t;return"draw"===e.results.qtype&&0===e.results.initpts[11]?s("div",{ref:"main",staticClass:"LPdrawgrid"},e._l(e.sortedKeys,function(t,n){return s("div",{key:n,class:[e.showans?e.results.scoredata[t]>0?"LPshowcorrect":"LPshowwrong":""]},[s("canvas",{staticClass:"drawcanvas",attrs:{id:"canvasLP"+e.itemid+"-"+n,width:e.results.initpts[6],height:e.results.initpts[7]}}),s("input",{attrs:{type:"hidden",id:"qnLP"+e.itemid+"-"+n}})])}),0):s("table",{ref:"main",staticClass:"LPres"},[s("thead",[s("tr",[s("th",[e._v(e._s(e.$t("livepoll.answer")))]),s("th",{staticStyle:{"min-width":"10em"}},[e._v(e._s(e.$t("livepoll.frequency")))])])]),s("tbody",e._l(e.sortedKeys,function(t,n){return s("tr",{key:n,class:[e.showans?e.results.scoredata[t]>0?"LPshowcorrect":"LPshowwrong":""]},["draw"===e.results.qtype?s("td",[s("canvas",{staticClass:"drawcanvas",attrs:{id:"canvasLP"+e.itemid+"-"+n,width:e.results.initpts[6],height:e.results.initpts[7]}}),s("input",{attrs:{type:"hidden",id:"qnLP"+e.itemid+"-"+n}})]):s("td",[e._v("\n        "+e._s(t)+"\n      ")]),s("td",[s("span",{staticClass:"LPresbarwrap"},[s("span",{staticClass:"LPresbar",style:{width:Math.round(100*e.results.datatots[t]/e.results.maxfreq)+"%"}},[s("span",{staticClass:"LPresval"},[e._v(e._s(e.results.datatots[t]))])])])])])}),0)])},F=[],V={name:"LivepollResultsGeneral",props:["results","showans","itemid"],computed:{sortedKeys:function(){var e=this.results.datatots,t=d()(e);return t.sort(function(t,s){return e[s]-e[t]})}},methods:{onUpdate:function(){var e=this;if("draw"===this.results.qtype){for(var t=0;t<this.sortedKeys.length;t++){var s=this.sortedKeys[t].replace(/\(/g,"[").replace(/\)/g,"]");s=s.split(";;"),""!==s[0]&&(s[0]="["+s[0].replace(/;/g,"],[")+"]"),s="[["+s.join("],[")+"]]";var n="LP"+this.itemid+"-"+t;window.canvases[n]=this.results.initpts.slice(),window.canvases[n].unshift(n),window.drawla[n]=JSON.parse(s)}this.$nextTick(function(){for(var t=0;t<e.sortedKeys.length;t++)window.imathasDraw.initCanvases("LP"+e.itemid+"-"+t)})}this.$nextTick(function(){setTimeout(window.drawPics,100),window.rendermathnode(e.$refs.main)})}},mounted:function(){this.onUpdate()},watch:{results:function(e,t){this.onUpdate()}}},j=V,M=Object(b["a"])(j,D,F,!1,null,null,null),U=M.exports,H={name:"LivepollResults",props:["qn","showresults","showans"],components:{LivepollResultsChoices:Q,LivepollResultsGeneral:U},computed:{qinfo:function(){return w["b"].assessInfo.questions[this.qn]},numResults:function(){return w["b"].livepollResults.hasOwnProperty(this.qn)?d()(w["b"].livepollResults[this.qn]).length:0},params:function(){for(var e=[],t=0;t<this.qinfo.answeights.length;t++)0===t&&this.qinfo.jsparams.hasOwnProperty(this.qn)?e[t]=this.qinfo.jsparams[this.qn]:e[t]=this.qinfo.jsparams[1e3*(this.qn+1)+t];return e},results:function(){for(var e=[],t=0;t<this.qinfo.answeights.length;t++){var s={},n={};if(this.params[t].hasOwnProperty("livepoll_choices"))for(var i=0;i<this.params[t].livepoll_choices.length;i++)s[i]=0,n[i]=0;var o=this.params[t].qtype,r="choices"===o||"multans"===o;if(r){var a=void 0;a="choices"===o?this.params[t].livepoll_ans.toString().split(/\s+or\s+/):this.params[t].livepoll_ans.toString().split(/\s*,\s*/);for(var l=0;l<a.length;l++)n[a[l]]=1}var u=[],c=void 0;for(var h in w["b"].livepollResults[this.qn]){var p=w["b"].livepollResults[this.qn][h].ans[t];p=r?p.toString().split("|"):o.match(/calc/)||"numfunc"===o?["`"+p+"`"]:[p],"draw"===o&&(c=this.condenseDraw(p[0]),u.hasOwnProperty(c)||(u[c]=p[0]));for(var d=0;d<p.length;d++)"draw"===o&&s.hasOwnProperty(u[c])?s[u[c]]+=1:s.hasOwnProperty(p[d])?s[p[d]]+=1:(s[p[d]]=1,n[p[d]]=w["b"].livepollResults[this.qn][h].score[t])}var v=1;for(var f in s)s[f]>v&&(v=s[f]);if(e[t]={datatots:s,scoredata:n,maxfreq:v,qtype:o},r&&(e[t].choices=this.params[t].livepoll_choices),"draw"===o){var m=this.params[t].livepoll_drawinit;m=m.replace(/"|'/g,"").split(",");for(var y=1;y<m.length;y++)m[y]=Number(m[y]);e[t].initpts=m}}return e}},methods:{condenseDraw:function(e){var t=e.replace(/\(/g,"[").replace(/\)/g,"]");t=t.split(";;"),""!==t[0]&&(t[0]="["+t[0].replace(/;/g,"],[")+"]"),t="[["+t.join("],[")+"]]";var s,n,i,o,r=JSON.parse(t);if(r[0].length>0)for(var a=0;a<r[0].length;a++)2===r[0][a].length&&r[0][a].sort(function(e,t){return e[0]===t[0]?e[1]-t[1]:e[0]-t[0]});else if(r.length>4&&r[4].length>0)return e;if(r[1].length>0&&r[1].sort(function(e,t){return e[0]===t[0]?e[1]-t[1]:e[0]-t[0]}),r[2].length>0&&r[2].sort(function(e,t){return e[0]===t[0]?e[1]-t[1]:e[0]-t[0]}),r.length>3&&r[3].length>0)for(var l=0;l<r[3].length;l++)s=r[3][l],5===s[0]?(s[1]===s[3]?n=[5,"x",s[1]]:(i=(s[4]-s[2])/(s[3]-s[1]),o=s[2]-i*s[1],n=[5,i.toFixed(4),o.toFixed(2)]),r[3][l]=n):5.2===s[0]?(s[1]===s[3]?n=[5.2,"x",s[1],s[2]]:(i=(s[4]-s[2])/(s[3]-s[1]),n=[5.2,i.toFixed(4),s[1],s[2]]),r[3][l]=n):5.3===s[0]?(n=s[1]<s[3]||s[1]===s[3]&&s[2]<s[4]?[5.3,s[1],s[2],s[3],s[4]]:[5.3,s[3],s[4],s[1],s[2]],r[3][l]=n):6===s[0]?(s[1]===s[3]?n=[6,"x",s[1],s[2]]:(i=(s[4]-s[2])/((s[3]-s[1])*(s[3]-s[1])),n=[6,i.toFixed(4),s[1],s[2]]),r[3][l]=n):6.5===s[0]?(s[1]===s[3]?n=[6.5,"x",s[1],s[2]]:(o=s[3]>s[1]?1:-1,i=(s[4]-s[2])/Math.sqrt(Math.abs(s[3]-s[1])),n=[6.5,i.toFixed(4),o,s[1],s[2]]),r[3][l]=n):8===s[0]&&(s[1]===s[3]?n=[8,"x",s[1],s[2]]:(i=(s[4]-s[2])/Math.abs(s[3]-s[1]),n=[8,i.toFixed(4),s[1],s[2]]),r[3][l]=n);return S()(r)}}},Y=H,G=(s("5a24"),Object(b["a"])(Y,T,R,!1,null,null,null)),J=G.exports,K=s("5dc8"),z=s("84ac"),W={name:"livepoll",components:{LivepollNav:_,Question:K["a"],LivepollSettings:P,LivepollResults:J,AssessHeader:u["a"],Timer:z["a"]},data:function(){return{showQuestion:!0,showResults:!0,showAnswers:!0,onSettings:!1,livepollTimer:null,socket:null}},computed:{isTeacher:function(){return w["b"].assessInfo.is_teacher},curqn:function(){return this.onSettings?-1:l()(w["b"].assessInfo.livepoll_status.curquestion)-1},curseed:function(){return w["b"].assessInfo.livepoll_status.seed},curstate:function(){return w["b"].assessInfo.livepoll_status.curstate},starttime:function(){return w["b"].assessInfo.livepoll_status.startt},timelimit:function(){return w["b"].livepollSettings.useTimer?l()(w["b"].livepollSettings.questionTimelimit):0},showAnswersLabel:function(){return this.curstate<3?this.$t("livepoll.show_answers_after"):this.$t("livepoll.show_answers")}},methods:{updateUsercount:function(e){w["b"].livepollStuCnt=e.cnt,0===e.teachcnt&&(w["b"].assessInfo.livepoll_status.curstate=0)},addResult:function(e){w["b"].livepollResults.hasOwnProperty(this.curqn)||this.$set(w["b"].livepollResults,this.curqn,{}),e.score=JSON.parse(e.score),e.ans=JSON.parse(e.ans),this.$set(w["b"].livepollResults[this.curqn],e.user,e)},showHandler:function(e){"showq"===e.action?this.$set(w["b"].assessInfo,"livepoll_status",{curstate:2,curquestion:l()(e.qn)+1,seed:l()(e.seed),startt:l()(e.startt)}):this.$set(w["b"].assessInfo,"livepoll_status",r()(w["b"].assessInfo.livepoll_status,{curquestion:l()(e.qn)+1,curstate:l()(e.action)}))},selectQuestion:function(e){clearTimeout(this.livepollTimer);var t=l()(e)-1;-1!==t?(this.onSettings=!1,t!==this.curqn&&(this.showQuestion=w["b"].livepollSettings.showQuestionDefault,this.showResults=w["b"].livepollSettings.showResultsLiveDefault,this.showAnswers=w["b"].livepollSettings.showAnswersAfter,t>=0&&w["a"].setLivepollStatus({newquestion:e,newstate:1}))):this.onSettings=!0},openInput:function(){var e=this;w["a"].setLivepollStatus({newquestion:this.curqn+1,newstate:2}),this.timelimit>0&&(this.livepollTimer=window.setTimeout(function(){return e.closeInput()},1e3*this.timelimit))},closeInput:function(){clearTimeout(this.livepollTimer);var e=this.showAnswers?4:3;w["b"].livepollSettings.showResultsAfter&&(this.showResults=!0),w["a"].setLivepollStatus({newquestion:this.curqn+1,newstate:e})},newVersion:function(){w["a"].setLivepollStatus({newquestion:this.curqn+1,newstate:1,forceregen:1}),this.$set(w["b"].livepollResults,this.curqn,{})},updateShowAnswers:function(){if(this.curstate>2){var e=this.showAnswers?4:3;w["a"].setLivepollStatus({newquestion:this.curqn+1,newstate:e})}}},mounted:function(){var e=this,t=w["b"].assessInfo.livepoll_server,s=w["b"].assessInfo.livepoll_data,n="room="+s.room+"&now="+s.now;s.sig&&(n+="&sig="+encodeURIComponent(s.sig)),this.socket=window.io("https://"+t+":3000",{query:n}),this.socket.off(),this.socket.on("livepoll usercount",function(t){return e.updateUsercount(t)}),w["b"].assessInfo.is_teacher?this.socket.on("livepoll qans",function(t){return e.addResult(t)}):this.socket.on("livepoll show",function(t){return e.showHandler(t)})},created:function(){0===w["b"].assessInfo.livepoll_status.curquestion&&this.isTeacher&&(this.onSettings=!0)}},B=W,X=(s("3ada"),Object(b["a"])(B,n,i,!1,null,null,null));t["default"]=X.exports},"25cc":function(e,t,s){},"26a5":function(e,t,s){"use strict";var n=s("25cc"),i=s.n(n);i.a},"296b":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home"},[s("assess-header"),s("videocued-nav",{attrs:{cue:e.cue,toshow:e.toshow},on:{jumpto:e.jumpTo}},[-1!=e.qn?s("videocued-result-nav",{staticClass:"med-left",attrs:{qn:e.qn,cue:e.cue},on:{jumpto:e.jumpTo}}):e._e()],1),s("div",{staticClass:"scrollpane"},[s("div",{directives:[{name:"show",rawName:"v-show",value:-1==e.cue,expression:"cue == -1"}],key:"-1",ref:"introtext",staticClass:"questionpane",domProps:{innerHTML:e._s(e.intro)}}),s("div",{directives:[{name:"show",rawName:"v-show",value:e.cue>-1&&-1===e.qn,expression:"cue > -1 && qn === -1"}],attrs:{id:"playerwrapper"}},[s("div",{staticClass:"video-wrapper-wrapper",style:{"max-width":e.videoWidth+"px"}},[s("div",{staticClass:"fluid-width-video-wrapper",style:{"padding-bottom":e.aspectRatioPercent+"%"}},[s("div",{attrs:{id:"player"}})])])]),e._l(e.questionArray,function(t){return s("div",{key:t,class:{inactive:t!=e.qn,questionpane:!0},attrs:{"aria-hidden":t!=e.qn}},[s("inter-question-text-list",{attrs:{pos:"before",qn:t,active:t==e.qn}}),s("full-question-header",{directives:[{name:"show",rawName:"v-show",value:t==e.qn,expression:"curqn == qn"}],attrs:{qn:t}}),s("question",{attrs:{qn:t,active:t==e.qn}}),s("inter-question-text-list",{attrs:{pos:"after",qn:t,active:t==e.qn}})],1)})],2)],1)},i=[],o=(s("28a5"),s("e814")),r=s.n(o),a=s("97cd"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"subheader"},[s("menu-button",{attrs:{id:"qnav",options:e.navOptions,selected:e.curOption,searchby:"title"},scopedSlots:e._u([{key:"default",fn:function(e){var t=e.option;return[s("videocued-nav-list-item",{attrs:{option:t}})]}}])}),e._t("default")],2)},u=[],c=s("a4bb"),h=s.n(c),p=s("ad76"),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[s("span",{staticClass:"qname-wrap"},[s("icons",{staticClass:"qstatusicon",attrs:{name:e.statusIcon}}),s("span",{class:{greystrike:""!==e.nameHover},attrs:{title:e.nameHover}},[e._v("\n      "+e._s(e.option.title)+"\n    ")]),e._v("\n    "+e._s(e.scoreDisplay)+"\n  ")],1),s("span",{staticClass:"redoicon"},[e.canRetry?s("icons",{attrs:{name:"retry"}}):e._e()],1)])},v=[],f=s("f05b"),w=s("6081"),m={name:"VideocuedNavListItem",props:["option"],components:{Icons:f["a"]},computed:{statusIcon:function(){return"v"===this.option.type||"f"===this.option.type?"video":"q"===this.option.type?w["b"].assessInfo.questions[this.option.qn].status:"none"},nameHover:function(){return"q"===this.option.type&&0!==w["b"].assessInfo.questions[this.option.qn].withdrawn?this.$t("header.withdrawn"):""},scoreDisplay:function(){if("q"!==this.option.type)return"";var e=w["b"].assessInfo.questions[this.option.qn];if(e.hasOwnProperty("gbscore")){var t=e.canretry?"(":"[";return t+=e.gbscore+"/"+e.points_possible,t+=e.canretry?")":"]",t}return this.$tc("header.pts",e.points_possible)},canRetry:function(){if("q"===this.option.type){var e=w["b"].assessInfo.questions[this.option.qn];return e.canretry}return!1}}},y=m,b=(s("26a5"),s("2877")),q=Object(b["a"])(y,d,v,!1,null,null,null),_=q.exports,g={name:"VideocuedNav",props:["cue","toshow"],components:{MenuButton:p["a"],VideocuedNavListItem:_},computed:{hasIntro:function(){return""!==w["b"].assessInfo.intro},navOptions:function(){var e=this,t=[];this.hasIntro&&t.push({onclick:function(){return e.$emit("jumpto",-1,"i")},title:this.$t("intro"),type:"i"});for(var s=function(s){var n=w["b"].assessInfo.videocues[s];t.push({onclick:function(){return e.$emit("jumpto",s,"v")},type:"v",title:n.title,cue:s}),n.hasOwnProperty("qn")&&t.push({onclick:function(){return e.$emit("jumpto",s,"q")},type:"q",title:e.$t("question_n",{n:r()(n.qn)+1}),qn:r()(n.qn),cue:s,subitem:!0}),n.hasOwnProperty("followuptime")&&t.push({onclick:function(){return e.$emit("jumpto",s,"f")},type:"f",title:n.followuptitle,cue:s,subitem:!0})},n=0;n<w["b"].assessInfo.videocues.length;n++)s(n);return t},curOption:function(){var e=r()(this.cue);if(-1===e&&this.hasIntro)return 0;for(var t=this.hasIntro?1:0;t<this.navOptions.length;t++)if(this.navOptions[t].cue===e&&this.navOptions[t].type===this.toshow)return t;return-1},showNextPrev:function(){return h()(this.navOptions).length>1},prevLink:function(){return this.curOption<=0?"":this.navOptions[this.curOption-1].internallink},nextLink:function(){return this.curOption>=this.navOptions.length-1?"":this.navOptions[this.curOption+1].internallink}}},A=g,x=(s("6869"),Object(b["a"])(A,l,u,!1,null,null,null)),k=x.exports,I=s("e536"),P=s("0597"),T=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.showNav?s("div",[e.hasNextVid?s("button",{class:{primary:"correct"!==e.status||!e.showSkip},on:{click:e.nextVidLink}},[e._v("\n    "+e._s(e.$t("videocued.continue",{title:e.nextVidTitle}))+"\n  ")]):e._e(),e.showSkip?s("button",{staticClass:"primary",on:{click:e.skipLink}},[e._v("\n    "+e._s(e.$t("videocued.skipto",{title:e.skipTitle}))+"\n  ")]):e._e()]):e._e()},R=[],$={name:"VideocuedResultNav",props:["qn","cue"],computed:{qdata:function(){return w["b"].assessInfo.questions[this.qn]},showNav:function(){return w["b"].inProgress&&w["b"].assessInfo.hasOwnProperty("questions")&&this.qdata.hasOwnProperty("score")&&(this.qdata.try>0||this.qdata.hasOwnProperty("tries_remaining_range"))&&0===this.qdata.withdrawn},showScores:function(){return"during"===w["b"].assessInfo.showscores},status:function(){if(!this.showScores||!this.qdata.hasOwnProperty("parts"))return"neutral";for(var e=0;e<this.qdata.parts.length;e++)if(0===this.qdata.parts[e].try||this.qdata.parts[e].rawscore<.98)return"neutral";return"correct"},nextVidType:function(){return w["b"].assessInfo.videocues[this.cue].hasOwnProperty("followuptitle")?"followup":"nextseg"},hasNextVid:function(){return"followup"===this.nextVidType||w["b"].assessInfo.videocues.hasOwnProperty(this.cue+1)},nextVidTitle:function(){return"followup"===this.nextVidType?w["b"].assessInfo.videocues[this.cue].followuptitle:w["b"].assessInfo.videocues[this.cue+1].title},showSkip:function(){return"correct"===this.status&&"followup"===this.nextVidType&&w["b"].assessInfo.videocues.hasOwnProperty(this.cue+1)},skipTitle:function(){return w["b"].assessInfo.videocues[this.cue+1].title}},methods:{skipLink:function(){this.$emit("jumpto",this.cue+1,"v")},nextVidLink:function(){"followup"===this.nextVidType?this.$emit("jumpto",this.cue,"f"):this.$emit("jumpto",this.cue+1,"v")}}},S=$,L=Object(b["a"])(S,T,R,!1,null,null,null),C=L.exports,O=s("5dc8"),N={name:"videocued",components:{FullQuestionHeader:I["a"],VideocuedNav:k,Question:O["a"],VideocuedResultNav:C,InterQuestionTextList:P["a"],AssessHeader:a["a"]},data:function(){return{youtubeApiLoaded:!1,videoWidth:600,aspectRatioPercent:56.2,ytplayer:null,timer:null,cue:0,toshow:"v"}},computed:{curCue:function(){return this.cue>-1?w["b"].assessInfo.videocues[this.cue]:{}},qn:function(){return"q"===this.toshow?r()(this.curCue.qn):-1},timeCues:function(){var e={};for(var t in w["b"].assessInfo.videocues)w["b"].assessInfo.videocues[t].hasOwnProperty("qn")&&(e[w["b"].assessInfo.videocues[t].time]=r()(t));return e},nextVidTimes:function(){for(var e={},t=0;t<w["b"].assessInfo.videocues.length;t++)w["b"].assessInfo.videocues[t].hasOwnProperty("followuptime")&&w["b"].assessInfo.videocues.hasOwnProperty(t+1)?e[w["b"].assessInfo.videocues[t].followuptime]=t:!w["b"].assessInfo.videocues[t].hasOwnProperty("qn")&&w["b"].assessInfo.videocues.hasOwnProperty(t+1)&&(e[w["b"].assessInfo.videocues[t].time]=t);return e},intro:function(){return w["b"].assessInfo.intro},questionArray:function(){for(var e={},t=0;t<w["b"].assessInfo.questions.length;t++)e[t]=t;return e}},methods:{createPlayer:function(){var e=this,t=!!(document.exitFullscreen||document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen),s={autoplay:0,wmode:"transparent",fs:t?1:0,controls:2,rel:0,modestbranding:1,showinfo:0},n=w["b"].assessInfo.videoar.split(":"),i=window.innerHeight-50;this.videoWidth=n[0]/n[1]*i,this.aspectRatioPercent=Math.round(1e3*i/this.videoWidth)/10,this.ytplayer=new window.YT.Player("player",{height:i,width:this.videoWidth,videoId:w["b"].assessInfo.videoid,playerVars:s,events:{onReady:function(){return e.handlePlayerReady()},onStateChange:function(t){return e.handlePlayerStateChange(t)},onError:function(t){return e.handlePlayerError(t)}}})},exitFullscreen:function(){var e=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;e&&(document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen())},checkTime:function(){var e=this,t=Math.floor(this.ytplayer.getCurrentTime());!this.timeCues.hasOwnProperty(t)||"v"===this.toshow&&this.cue===this.timeCues[t]+1||"f"===this.toshow&&this.cue===this.timeCues[t]||this.ytplayer.getPlayerState()!==window.YT.PlayerState.PLAYING?(this.nextVidTimes.hasOwnProperty(t)&&this.cue===this.nextVidTimes[t]&&(this.cue=this.cue+1,this.toshow="v"),this.timer=window.setTimeout(function(){e.checkTime()},200)):this.jumpTo(r()(this.timeCues[t]),"q")},handlePlayerReady:function(){window.$("iframe#player").removeAttr("height").removeAttr("width").css("height","").css("width","")},handlePlayerStateChange:function(e){var t=this;e.data===window.YT.PlayerState.PLAYING?this.timer=window.setTimeout(function(){t.checkTime()},200):e.data===window.YT.PlayerState.ENDED&&"v"===this.toshow&&this.curCue.hasOwnProperty("qn")&&(window.clearTimeout(this.timer),this.jumpTo(this.cue,"q"))},handlePlayerError:function(e){w["b"].errorMsg=e.data},jumpTo:function(e,t){if(-1===e||"q"===t)this.exitFullscreen(),this.ytplayer&&this.ytplayer.pauseVideo();else{var s=w["b"].assessInfo.videocues[e],n=0;if("v"===t){if(e>0){var i=w["b"].assessInfo.videocues[e-1];n=i.hasOwnProperty("followuptime")?i.followuptime:i.time}}else"f"===t&&(n=s.time);this.ytplayer.seekTo(n,!0),this.ytplayer.playVideo()}this.cue=e,this.toshow=t}},created:function(){var e=this;""!==w["b"].assessInfo.intro&&(this.cue=-1,this.toshow="i"),window.onYouTubePlayerAPIReady=function(){e.youtubeApiLoaded=!0,e.createPlayer()};var t=document.createElement("script");t.src="//www.youtube.com/player_api",document.head.appendChild(t)},mounted:function(){setTimeout(window.drawPics,100),window.rendermathnode(this.$refs.introtext)}},E=N,Q=(s("59d1"),Object(b["a"])(E,n,i,!1,null,null,null));t["default"]=Q.exports},"3ada":function(e,t,s){"use strict";var n=s("8e0c"),i=s.n(n);i.a},4204:function(e,t,s){"use strict";var n=s("e249"),i=s.n(n);i.a},5845:function(e,t,s){},"59d1":function(e,t,s){"use strict";var n=s("5e03"),i=s.n(n);i.a},"5a24":function(e,t,s){"use strict";var n=s("5845"),i=s.n(n);i.a},"5e03":function(e,t,s){},6869:function(e,t,s){"use strict";var n=s("cdfd"),i=s.n(n);i.a},"8e0c":function(e,t,s){},aa77:function(e,t,s){var n=s("5ca1"),i=s("be13"),o=s("79e5"),r=s("fdef"),a="["+r+"]",l="​",u=RegExp("^"+a+a+"*"),c=RegExp(a+a+"*$"),h=function(e,t,s){var i={},a=o(function(){return!!r[e]()||l[e]()!=l}),u=i[e]=a?t(p):r[e];s&&(i[s]=u),n(n.P+n.F*a,"String",i)},p=h.trim=function(e,t){return e=String(i(e)),1&t&&(e=e.replace(u,"")),2&t&&(e=e.replace(c,"")),e};e.exports=h},c5f6:function(e,t,s){"use strict";var n=s("7726"),i=s("69a8"),o=s("2d95"),r=s("5dbc"),a=s("6a99"),l=s("79e5"),u=s("9093").f,c=s("11e9").f,h=s("86cc").f,p=s("aa77").trim,d="Number",v=n[d],f=v,w=v.prototype,m=o(s("2aeb")(w))==d,y="trim"in String.prototype,b=function(e){var t=a(e,!1);if("string"==typeof t&&t.length>2){t=y?t.trim():p(t,3);var s,n,i,o=t.charCodeAt(0);if(43===o||45===o){if(s=t.charCodeAt(2),88===s||120===s)return NaN}else if(48===o){switch(t.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+t}for(var r,l=t.slice(2),u=0,c=l.length;u<c;u++)if(r=l.charCodeAt(u),r<48||r>i)return NaN;return parseInt(l,n)}}return+t};if(!v(" 0o1")||!v("0b1")||v("+0x1")){v=function(e){var t=arguments.length<1?0:e,s=this;return s instanceof v&&(m?l(function(){w.valueOf.call(s)}):o(s)!=d)?r(new f(b(t)),s,v):b(t)};for(var q,_=s("9e1e")?u(f):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),g=0;_.length>g;g++)i(f,q=_[g])&&!i(v,q)&&h(v,q,c(f,q));v.prototype=w,w.constructor=v,s("2aba")(n,d,v)}},cdfd:function(e,t,s){},e249:function(e,t,s){},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=special.js.map
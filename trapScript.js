var devTool = 0,
 mVol = 1,
 sVol = 1,
 particles = true,
 gameCycle = 1;

//player stats
var pPos = [2,2],
 st,
 pMax = 4,
 pHP = pMax,
 fp = 0,
 specl = 0,
 iFrm = false,
 pHit = [true,false,false],
 pColor = "",
 pGreat = 0,
 pShot = [0,0],
 pHeal = false,
 pMist = [false,false,false],
 mistHb = [-5,-5,-5,-5],//startx,starty,perx,pery
 pStats = [0,0,0,0];//DMG,SB,FPS,RGE

//trapoid stats
var rest = 0,
 comb = -1,
 tMax = 800,
 tHP = tMax,
 tColor = "#277",
 phase = -2,
 mode = 0,
 atking = false,
 running = false,
 curAtk = null,
 atkSet = [null,null],
 atkLen = [8,10,8],
 atkLenT = [8,10,8],
 atkLenP = [8,10,8],
 atkCnt = 0,
 stab = 0,
 sqreCnt = 0,
 push = tMax-77,
 sChan = 0,
 delay = 750,
 combo = 3,
 hb = {
  ball1: [-1,0],
  ball2: [5,1],
  ball3: [-1,2],
  ball4: [5,3],
  ball5: [-1,4],
  stab: [[1,2,3],[1,2,4],[1,3,4],[2,3,4]]
},
 field = [],
 credits = [11,false];

//perfetto stats
var tPos = [2,5];
var IvyCnt = 0;
var IvyDial = [
  "Especially Loui, poor lad. Heaven knows he deserved better.",
  "There's nothing for you outside. I don't care if I must beat this lesson into you, there will be no leaving.",
  "No need Ivy, let me take care of this worm. Anyone who disrespects my lady's kindness, deserves the pain of a thousand deaths.",
  "",
  "Nothing you do matters, no one can fully die here. That's your problem, you always wanted more. More more more, it's never enough. You just can't handle it when things don't go your way.",
  "But that's fine. Here you can fight and scratch and scream as much as you like and I can still forgive you. I will keep you in my void for as long as it takes. This was our deal after all.",
]

//unlocking nonesense
var noSpecials = true,
 noPush = 0,
 guning = 0,
 timer = 0,
 bumpscocity = 0,
 letsRock = false,
 speels = 0,
 moves = 0,
 blade = 220,
 angu = "",
 edagg = 0;

//sound effects
var a = {
  TTheme1: id('aTTheme1'),
  BTheme1: id('aBTheme1'),
  BTheme2: id('aBTheme2'),
  BTheme3: id('aBTheme3'),
  Swipe: id('aSwipe'),
  GSwipe: id('aGSwipe'),
  Punch: id('aPunch'),
  Gun: id('aGun'),
  Heal: id('aHeal'),
  Mist: id('aMist'),
  Broke: id('aBroke'),
  Youch: id('aYouch'),
  Push: id('aPush'),
  P2Now: id('aP2Now'),
  Unlock: id('aUnlock'),
  Giga: id('aGiga'),
  Loaded: id('aLoaded'),
  Boke: id('aBoke'),
  Angle: id('aAngle')
};

a.TTheme1.loop = true;
a.BTheme1.loop = true;
a.BTheme2.loop = true;
a.BTheme3.loop = true;

//sprites
var s = {
  sword: "https://i.imgur.com/uoVomzP.png",
  swSlash: "https://i.imgur.com/A6zpNPP.png",
  perGreatSw: "https://i.imgur.com/QW9K3qg.png",
  fist: "https://i.imgur.com/lzsVclG.png",
  circ: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShL2KsSSn4TF37ND4zDKZy9j2swwZsHs7zBjUy-HR2FVYIjFqlILaGek-ETCjQctkOdcA&usqp=CAU",
  trian: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzUUtDMvJJXZ4JJKw3vbkxjrSQJbgZqa09u2ifG9hz1BJd6m8MF4ZVSgahtvet33mlX0:https://thumbs.dreamstime.com/z/triangle-character-4190247.jpg&usqp=CAU"
};

//areas
var z = {
  toTitle: {
    bgd: "linear-gradient(0deg, #68b, #589)",
    bos: -1,
    zon: "title",
  }, toHub: {
    bgd: "linear-gradient(180deg, #ed9 0%, #48a 60%, #36e 93%, #953 100%)",
    bos: 0,
    zon: "hub",
  }, toTrapoid: {
    bgd: "radial-gradient(circle, #dc9 0%, #a64 60%, #c85 93%, #431 100%)",
    bos: 1,
    zon: "arena",
  }, toTrigon: {
    bgd: "#fff",
    bos: 2,
    zon: "arena",
  }, toIvy: {
    bgd: "repeating-radial-gradient(#512, #302 80px)",
    bos: 3,
    zon: "arena",
  }
};

//loadouts
var ld = [0,13,0];
var l = {
  wpn: [ //name, unlocked, type, damage, range, description
    ["Sword", true, 0, 4, 3, "whoops", "A small, chipped blade filled with memories, it's been a while. <br>A basic weapon with solid damage and range. It does more damage at the top row."],
    ["Spear", false, 0, 3, 2, "To Unlock <br>Meet your first demise.", "Trapoid always hated this one. A former denizen of the void left it here. <br>A long weapon with extra reach and low damage."],
    ["Great Sword", false, 1, 8, 3, "To Unlock <br>Beat trapoid phase 1 in under 1:30.", "Very few people are strong enough to properly wield this, but those who can are capable of great violence. <br>A large weapon with high damage and stationary swinging."],
    ["Fists", false, 2, 1, 4, "To Unlock <br>Beat trapoid phase one without using specials.", "Trapoid could not take you in a 1v1 fist fight. <br>A debatable weapon with low damage and focus strikes."],
    ["Wand", false, 3, 1.5, 3, "To Unlock <br>Unlock every spell.", "Triangles are naturally gifted in using magic, meanwhile lowly circles need help. <br>A magical weapon with low damage and high Spell Bonus."],
    ["Elegant Dagger", false, 4, 2, 4, "To Unlock <br>Beat Trapoid at max HP.", "It seems Trapoid left a gift, perhaps he's impressed with how far you've come. <br>A small weapon with low reach and high damage while moving."],
    ["Hatchet", false, 5, 5, 3, "To Unlock <br>Get max FP.", "This one looks familiar. It was an accident you said. <br>A sturdy weapon with great damage and less focus."]
  ],
  spc: [ //name, unlocked, type, spell bonus, cost, description
   ["TR 16", true, 0, 5.5, 8, "whoops", "A cold steel firearm that reeks of gunpowder. <br>A ranged blast dealing mild damage, more at the bottom row."],
   ["Poison Mist", false, 1, 5, 65, "To Unlock <br>Dodge every push attack in phase 1.", "A crazed, yellow circle man once used this to stop a protest in Shapeous, and he was promptly arrested. <br>Summon a cloud of damaging gas that hurts you and trapoid."],
   ["Heal", false, 2, 1, 100, "To Unlock <br>Beat phase 1 with 1 health left.", "The woman who brought you here taught you this ability. <br>Use your will to close your wounds while stationary. Said will grants strength afterward."],
   ["Blood Pistol", false, 4, 1, 12, "To Unlock <br>Shoot Trapid 100 times with the Tr16 in one run.", "The barrel still feels warm to the touch. Didn't this belong to you? <br>A ranged blast dealing low damage that increases every shot."],
   ["Auto Ripper", false, 5, 1, 1, "To Unlock <br>Get 10 damage per shot on the Blood Pistol", "When everyone has left your side, a gun won't. <br>A low cost blast of increasing damage while stationary and unhit."],
   ["Angular Cannon", false, 6, 150, 100, "To Unlock <br>giveme", "Typically used for demolition, Angular Cannons highly destructive firearms. <br>A massive blast dealing incredible damage at the cost of health."]
  ],
  itm: [//name, unlocked, type, bonus1, *bonus2, description
    ["Cardboard Armor", false, 0, "H1", "To Unlock <br>All you gotta do is ask.", "This void has quite the silly jokes. <br>+1HP"],
    ["Smoking Addiction", false, 1, "D4", "To Unlock <br>Click on Trapoid's eye.", "Every pack reminds you of Shapeous. It was dark on that bridge. <br>+4DMG -1HP"],
    ["Arm Stretcher", false, 1, "R1", "To Unlock <br>Click on the PIT Works.", "You left Shapeous for a reason. He wouldn't forgive you. <br>+1RGE -1HP -1FPS"],
    ["The Dark Dog", false, 1, "S3", "To Unlock <br>Beat the secret boss.", "U gyot tat dark dawg in u. <br>+3SB +4FPS -2HP"],
    ["Bumpscocity", false, 2, "h3", "To Unlock <br>Well you start by increasing Bumpscocity.", "The more you have, the more you'll... She didn't finish. <br>An all stats up ;), Let's Rock."],
    ["Light Bulb", false, 3, "D3", "To Unlock <br>Beat Trigon Trapoid.", "The light of His life broke, who's fault was that again? <br>+3DMG +4SB until it breaks. Don't let it break."],
    ["Magic Shield", false, 4, "__", "To Unlock <br>Use the Legacy Controls.", "A safe place to stay and never return to your problems. <br>+1DR at the bottom 3 rows."],
    ["Magnet", false, 5, 0, "To Unlock <br>Die with the greatsword.", 1, '"Loui" is faintly etched on the side. When was he here? <br>Move in the opposite direction while casting a spell. At max FP, it grants temporary invincibility.'],
    ["Pink Bandaid", false, 6, "__", "To Unlock <br>Last 1 minute without getting hit.", "It would take more than a bandaid to fix your soul. <br>Heal 0.5HP every 55 seconds geting faster the more fp you have."],
    ["Manuel Engine", false, 7, "__", "To Unlock <br>Move 200 times in one fight.", "Her blood rests on your hands alone. Regret doesn't alter the truth. <br>Gain 0.5FP every time you move"],
    ["D20", false, 8, "__", "To Unlock <br>Reset your progress.", "Perhaps a crippling gambling addiction leads to poor life choices. <br>5% change to deal 2x damage on any attack"],
    ["Atom Aligner", false, 9, "__", "To Unlock <br>Get hit by 7 push attacks in phase 1.", "It still hurts like hell, but you won't die. <br>50% chance to dodge an attack"],
    ["Bumprocity", false, 1, "B2", "To Unlock <br>Beat the secret boss with Bumpscocity.", "Ultimate power at the cost of sanity. <br>+2HP +2DMG +0.5DR +2SB +2FPS +2RGE"],
    ["None", true, 10, 0, "whoops", "empty."]
  ]
};

//asset loading
for(let i = 0; i<25; i++) {
  let id = i%5+""+Math.abs(4 -((i -(i%5)) /5));
  $("#field").append("<div id=\"t"+id+"\" class=\"tile\">"+id+"</div>");
  if(!devTool) $(".tile").html("");
};

$(".attack, .hidden, .hint").hide();
if(!devTool) {
  $(".circ").html("");
  $("#loadout, #lText").hide();
} else {
  let deU = [["eSpear", "wpn", 1],["eGSword", "wpn", 2],["eFist", "wpn", 3],["eWand", "wpn", 4],["eDagg", "wpn", 5],["eHatch", "wpn", 6],
             ["eMist", "spc", 1],["eHeal", "spc", 2],["eBGun", "spc", 3],["eAuRp", "spc", 4],["eCann", "spc", 5],
             ["iCA", "itm", 0],["iSA", "itm", 1],["iAS", "itm", 2],["iTDD", "itm", 3],["iB", "itm", 4],["iMS", "itm", 6],["iHW", "itm", 7],["iLB", "itm", 5],["iPB", "itm", 8],["iME", "itm", 9],["iD2", "itm", 10],["iAA", "itm", 11],["iB2", "itm", 12]];
  for(let i in  deU) {
    unlock(deU[i][0],deU[i][1],deU[i][2]);
  }
}

if(localStorage.playtime == null) localStorage.setItem('playtime',0);
for (i = 0; i < localStorage.length; i++) {
  var x = localStorage.key(i);
  var y = localStorage.getItem(x);
   var curr = y.split('|');
  if(curr.length == 4) {
    unlock(curr[0], curr[1], curr[2]);
  } else {
    if(curr[0] == 'trig=beat;')/**/$("#toTrigon").show();
    if(curr[0] == 'perf=beat;')/**/$("#toIvy").show();
  }
}

document.body.onkeydown = function(e){
  if(mode > 0) {
    //w ^ i
    if(pPos[1] < 4 && key(e, 87, 38, 73))/**/move(0,1);
    if(e.which == 73)/**/unlock("iMS", "itm", 6);
    //a < j
    if(pPos[0] > 0 && key(e, 65, 37, 74))/**/move(-1);
    //s V k
    if(pPos[1] > 0 && key(e, 83, 40, 75))/**/move(0,-1);
    //d > l
    if(pPos[0] < 4 && key(e, 68, 39, 76))/**/move(1);
    //x m attack
    if(pPos[1] >= l.wpn[ld[0]][4]-pStats[3] && tHP > 0 && key(e,88,77,1))/**/melee();
    //c n special
    if(key(e,67,78,1) && tHP > 0)/**/special();
  }
    if(e.which == 71)/**/code("g");
    if(e.which == 73)/**/code("i");
    if(e.which == 86)/**/code("v");
    if(e.which == 69)/**/code("e");
    if(e.which == 77)/**/code("m");
}

$(".toZone").click(function() {
  setArea(z[$(this).val()]);
});

$(".equip").hover(function() {
  let v = $(this).val();
  console.log(v.substring(3))
  $("#eDescription").html(l[v.substring(0,3)][v.substring(3)][l[v.substring(0,3)][v.substring(3)].length-1])
  if(!l[v.substring(0,3)][v.substring(3)][1]) {
    switch(v.substring(0,3)) {
      case "wpn": $("#eDescription").html(l.wpn[v.substring(3)][5]); break;
      case "spc": $("#eDescription").html(l.spc[v.substring(3)][5]); break;
      case "itm": $("#eDescription").html(l.itm[v.substring(3)][4]); break;
    }
  }
}).click(function() {
  let v = $(this).val();
  if(l[v.substring(0,3)][v.substring(3)][1]) {
    switch(v.substring(0,3)) {
      case "wpn":
        ld[0] = v.substring(3);
        $("#eWpn").html("Current__Weapon: "+l.wpn[ld[0]][0]);
        break;
      case "spc":
        ld[2] = v.substring(3);
        $("#eSpc").html("Current____Spell: "+l.spc[ld[2]][0]);
        break;
      case "itm":
        ld[1] = v.substring(3);
        $("#eItm").html("Current_____Item: "+l.itm[ld[1]][0]);
        break;
    }
    pMax = 4;
    pStats = [0,0,0,0];
    st = parseInt(l.itm[ld[1]][3][1]);
    switch(l.itm[ld[1]][2]) {
      case 0: pMax = 5; break;
      case 1:
        pMax = 3;
        switch(l.itm[ld[1]][3][0]) {
          case "D":
            pStats[0] = st; break;
          case "S":
            pMax = 2;
            pStats[1] = st;
            pStats[2] = st+1;
            break;
          case "R":
            pStats[3] = st;
            pStats[2] = -1;
            break;
          case "B":
            pMax = 6;
            pStats[0] = st;
            pStats[1] = st;
            pStats[2] = st;
            pStats[3] = st;
            break;
        }
        break;
      case 2: pMax = 1; break;
      case 3:
        pStats[0] = st;
        pStats[1] = st+1;
        break;
    }
    if(tp("wpn0", 3)){pStats[1]+=4;}
    pHP = pMax;
    barUp();
  }
});

$(".pop").click(function() {
  fade($(this).val());
  var sec = Math.round(localStorage.playtime%60);
  var min = Math.floor(localStorage.playtime/60)%60;
  var hor = Math.floor(localStorage.playtime/60/60);
  if(sec < 10) sec = "0"+sec; 
  if(min < 10) min = "0"+min; 
  if(hor < 10) hor = "0"+hor; 
  $("#playTime").html("Playtime "+hor+":"+min+":"+sec);
  console.log(localStorage.playtime);
});

$("#sxf").change(_=> {
  sVol = $("#sxf").val()/100;
});

$("#music").change(_=> {
  mVol = $("#music").val()/100;
  a["TTheme1"].volume = mVol;
});

$("#partics").click(_=> {
  particles = !particles;
});

$("#upBump").change(_=> {
  bumpscocity = $("#upBump").val();
  if(bumpscocity == 100) {
    if(letsRock)/**/unlock("iB", "itm", 4);
    $("#hint1, #hint2").show();
  } else/**/$("#hint1, #hint2").hide();
});

$("#hint3").click(_=> {
  if(bumpscocity == 100 && ld[2] == 2) {
    letsRock = true;
    $("#upBump").val(50);
    $("#hint1").html("Your Bumpscocity is ample, now come and find me.");
    $("#hint1, #hint3").hide();
  }
});

$("#newGame").click(_=> {
  gameCycle++;
  $("#newGame").hide();
});

$("#iCA").click(_=> {
  unlock("iCA", "itm", 0);
});

$("#patch").click(_=> {
  unlock("iAS", "itm", 2);
});

$(".eye").click(_=> {
  unlock("iSA", "itm", 1);
});

$("#clearCook").click(_=> {
  if(l.itm[10][1]) localStorage.clear();
  else  unlock("iD2", "itm", 10);
});

$("#next").click(_=> {
  $("#dialouge").html(IvyDial[IvyCnt]);
  IvyCnt++;
  if(IvyCnt == 3) {
    $("#Ivy").fadeOut();
    $("#per").fadeIn();
    $("#dialouge").css({color: "#fc7"});
  } else/**/$("#dialouge").css({color: "#fff"});
  if(IvyCnt == 4)/**/$("#next, #dialouge").hide();
  if(IvyCnt == 7) {
    $("#next, #dialouge").hide();
    sd("Youch");
    deathIsNowFinallyAMechanic();
  }
});

//---------------------Core Clock--------------------
setInterval(_=> {
  if(running)move(0, 1,false,"per");
  if(phase > -2 && mode > 0) {
    timer++;
    if(timer == 240 && pHP == pMax)unlock("iPB", "itm", 8);
    if(ld[1] == "8" && timer % 220-fp == 1+fp)pHP = pHP+.5 > pMax ? pMax : pHP+.5;
    let s = hb.stab[stab];
    mistMurder();
    switch(mode) {
      case 1:
        if(!atking) { // attack chooser
          sChan = Math.round(Math.random()*5);
          atking = true;
          atkReset(phase);
          setTimeout(_=> {
            delay = combo === 0 ? 1250 : 50;
            combo = combo > -1 ? combo-1 : 2;
            stab = Math.round(Math.random()* 3);
            curAtk = Math.floor(Math.random()*3);
            tele(curAtk);
          }, delay);
        }
        switch(phase) { // attack execution
          case 1:
            switch(curAtk) {
              case 0: brit(s[0], s[1], s[2]); break;
              case 1: weBall(); break;
              case 2: squared(); break;
            }
            stopT();
            break;
          case 2:
            cubed();
            switch(curAtk) {
              case 0: brit(s[0], s[1], s[2]); break;
              case 1: weBall(); break;
              case 2: pissOn(); break;
            }
            stopT();
            break;
        }
        break;
      case 3:
        rest--;
        if(!atking) {
          let rando = pMist[2] ? 3+Math.round(Math.random()*3) : Math.round(Math.random()*6);
          if(Math.random() < .75 && ((pMist[2] || rest % 10 < 5) && pPos[0] > tPos[0])) {
            move(1, 0,false,"per");
          } else if(Math.random() < .75  && ((pMist[2] || rest % 10 < 5) && pPos[0] < tPos[0])) {
            move(-1, 0,false,"per");
          } else if(rando > 3 && rest <= 0) {
            for(let i = 0; i < 3; i++) {
              curAtk = AICheck(i);
              if(tHP < 400) {
                if(Math.random() < .077)/**/curAtk = 6;
              }
              if(curAtk) {
                atking = true;
                break;
              }
            }
            if(pos(pPos, [tPos[0],tPos[1]-1]) && Math.random() < .017+(gameCycle-1)*.25)/**/curAtk = 11;
          }
        }
        switch(curAtk) {
          case 1: sideSlash(); break;
          case 2: frontSlash(); break;
          case 3: dashSlash(); break;
          case 4:
            if(!pMist[2]) {
              smoker();
            } else {
              atking = false;
              curAtk = null;
            }
            break;
          case 5: quickSlash(); break;
          case 6: healing(); break;
          case 7: schoolShooting(); break;
          case 8: punchies(); break;
          case 9: sweepSlash(); break;
          case 10: megaSlash(); break;
          case 11: manHandle(); break;
        }
        break;
    }
  }
  st = parseInt(l.itm[ld[1]][3][1]);
}, 250);

//-----------------------Menuing----------------------
function fade(show) {
  $(".popUp").fadeOut();
  $("#"+show).fadeIn();
}

//-----------------game state updates----------------
function clearCookies (){
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";"); });
  window.location.reload();
}

function setArea(zone) {
  blade = 220;
  curAtk = null;
  mode = zone.bos;
  $(".holder, .popUp").hide();
  $("#"+zone.zon).fadeIn();
  $("#background").css({background: zone.bgd});
  a.TTheme1.pause();
  $("#menuImg").attr("src", Math.random() < 0.90 ? s.trian : s.circ);
  if(speels >= 5) unlock("eWand", "wpn", 4);
  if(zone.bos == 0)/**/sd("TTheme1");
  if(mode == 3) {
    tPos[1] = 5;
    tColor = "#fc7";
    tMax = 1800*gameCycle;
    $("#trapoid").hide();
    if(IvyCnt < 4)/**/$("#Ivy, #next, #dialouge").show();
    else/**/$("#per").show().css({background: tColor, top: "-66px"});
    if(ld[1] == 4)/**/blade = 170;
    $("#bHP").css({background: "linear-gradient(180deg, #fc7, #963)"});
    $("#nametag").css({color: "#612"}).html("Perfetto");
  } else {
    tMax = 800*gameCycle;
    push = tMax-77;
    $("#trapoid").show().css({"border-top": "100px solid #277"});
    $("#bHP").css({background: "linear-gradient(180deg, #e24, #902)"});
    $("#nametag").css({color: "#499"}).html("Trapoid");
    if(ld[1] == 4)/**/$("#trapoid").css({"border-top": "200px solid #277"});
    $("#per, #Ivy").hide();
  }
  pHP = pMax;
  tHP = tMax;
  fpUp(-10000);
}

function deathIsNowFinallyAMechanic() {
   l.spc[3][3] = 1;
   phase = -2;
  localStorage.setItem("playtime", parseInt(localStorage.playtime)+timer/4);
   timer = 0;
   guning = 0;
  tColor = "#277";
  pColor = "#39f";
   noSpecials = true;
   noPush = 0;
   moves = 0;
   atking = false;
   running = false;
   pMist[0] = false;
   pMist[1] = false;
   pMist[2] = false;
   a.BTheme3.pause();
   a.BTheme1.pause();
   a.BTheme2.pause();
  unlock("eSpear", "wpn", 1);
  if(ld[0] == 2)/**/unlock("iHW", "itm", 7);
  setArea(z.toTitle);
  atkReset();
  $(".gas").remove();
  $(".shot").remove();
  $("#trapoid").css({ "animation-name": "float", "animation-duration": "4s", 
    "border-top-color": "#277", transform: "rotate(0deg)",  top: "-110px"});
}

function barUp() {
  pColor = pHP <=pMax/4 ? "#169" : pHP <= pMax/2 ? "#28c" : "#39f";
  $("#bHP").animate({"width": (tHP/tMax*100)+"%"}, 50);
  $("#hp").animate({width: (pHP/pMax*100)+"%"}, 100).html(pHP+" HP");
  $("#fpGone").css({"border-color": "#ccc"});
  $("#fp").css({transform: "scale("+(100-fp)+"%)"});
  if(fp == 100)/**/$("#fpGone").css({"border-color": "#dff"});
  if(devTool)/**/$("#bHP").html(tHP+" HP");
}

function fpUp(by) {
  fp = fp+by > 100 ? 100 : fp+by < 0 ? 0 : fp+by;
  if(fp == 100) unlock("eHatch", "wpn", 6);
  if(fp == 0)/**/$(".pShot").remove();
  barUp();
}

function ballSmack() {
  for(let i = 1; i < 6; i++) {
    if(pos(pPos,hb["ball"+i]) && phase > 0)/**/ouchers(1);
  }
}

function phase2() {
  a.BTheme2.pause();
  sd("BTheme1", "P2Now");
  tColor = "#d25";
  $("#background").css({"animation-name": "redBack"});
  $("#trapoid").css({"animation-name": "pissed", "animation-duration": "5s"});
  $("#bHP").animate({width: "100%"}, 5000).css({background: "linear-gradient(180deg, #4e9, #499)"});
  $("#nametag").css({color: "#c26"}).html("Pissed Trapoid");
  if(noSpecials)/**/unlock("eFist", "wpn", 3);
  if(timer <= 365)/**/unlock("eGSword", "wpn", 2);
  if(pHP == 1)/**/unlock("eHeal", "spc", 2);
  if(noPush == 0)/**/unlock("eMist", "spc", 1);
  setTimeout(_=> {
    atking = false;
    phase = 2;
    tHP = tMax*gameCycle;
    $("#trapoid").css({ "animation-name": "float2", "animation-duration": "0.5s",
      "border-top-color": "#d25", transform: "rotate(180deg)", top: "-135px"});
    $("#background").css({ "animation-name": "none",
      background: "radial-gradient(circle, #612 0%, #524 60%, #d42 100%)"});
    barUp();
    if(bumpscocity == 100 && ld[2] == 2 && !letsRock)/**/{$("#hint3").show(); $("#trapoid").hide()}
  }, 5000);
}

function unlock(but, ld, slot) {
  if(!l[ld][slot][1]){
    if(ld == "spc")speels++;
    l[ld][slot][1] = true;
    localStorage.setItem(but, but + '|' + ld + '|' + slot + '|' + 'true');
    $("#"+but).removeClass("locked");
    sd("Unlock");
  }
}

function sd() {
  for(let i in arguments) {
    a[arguments[i]].load();
    a[arguments[i]].play();
    a[arguments[i]].volume = 0.2;
    if(arguments[i].indexOf("Theme") > 0)/**/a[arguments[i]].volume = mVol;
    else/**/a[arguments[i]].volume = sVol;
  }
}

//------------------player functions-----------------
function move(X = 0,Y = 0, I = false, whom = "p") {
  if((((tp("wpn0", 1) && pGreat == 0) || l.wpn[ld[0]][2] != 1) && !pHeal) || I || whom == "per") {
    if(whom == "per") {
      tPos[1]+=Y;
      tPos[0]+=X;
    } else {
      pPos[1]+=Y;
      pPos[0]+=X;
      moves++;
      if(moves >= 200) unlock("iME", "itm", 9);
      edagg++;
      l.wpn[5][3] = 6;
      l.spc[4][4]=1;
      l.spc[4][3]=1;
      setTimeout(_=> {edagg--; if(edagg == 0)l.wpn[5][3] = 2}, 500);
      if(tp("itm1", 7) && phase != -2)fpUp(0.5);
      if(!I && tp("itm1", 5)) { // heavy weapon
        l.itm[ld[1]][3] = X == -1 ? 1 : X === 0 ? 0 : -1;
        l.itm[ld[1]][5] = Y == -1 ? 1 : Y === 0 ? 0 : -1;
      } else if(I && fp == 100) {
        iFrm = true;
        setTimeout(_=> iFrm = false, 200);
      }
      ballSmack();
    }
    if(X !== 0) { //left and right movement
      $("#"+whom).css({left: "+="+(32.5*X)+"px", width: "65px"});
      setTimeout(_=> $("#"+whom).css({left: "+="+(32.5*X)+"px", width: "45px"}), 50);
    }
    if (Y !== 0) { // up and down movement
      $("#"+whom).css({top: "-="+(22.5*Y)+"px", height: "70px"});
      setTimeout(_=> $("#"+whom).css({top: "-="+(22.5*Y)+"px", height: "50px"}), 50);
    }
    if(tPos[0] == 5)/**/$("#pTile").show(); else/**/$("#pTile").hide();
  }
}

function melee() {
  if(phase == -2) {
    phase = 1;
    if(mode == 3) {
      IvyCnt = 4;
      sd("BTheme3");
      move(1, 0,false,"per");
      $("#per").fadeIn();
      $("#Ivy, #dialouge, #next").fadeOut();
      $("#background").css({background: "repeating-radial-gradient(#da5, #612 80px)"});
    } else/**/sd("BTheme2");
  }
  if(!pHit[0]) { //anti spam
    pHit[0] = true;
    if(!pHit[1]) {
      pHit[2] = true;
      $("#p").css({"border-color": "#f00"});
      setTimeout(_=>{
        pHit[2] = false;
        $("#p").css({"border-color": "transparent"});
      }, 1000);
    }
  }
  if(pHit[0] && !pHit[2]) { //actual attack
    pHit[0] = false;
    pHit[1] = false;
    pGreat = tp("wpn0", 1) ? pGreat+1 : pGreat;
    $("#pAtk").attr("src", s.sword).show()
      .css({transform: "rotate(-150deg)",left: "-75px", bottom: "-80px"});
    setTimeout(_=> {
      pHit[1] = true;
      $("#p").css({"border-color": "#fff"});
      $("#pAtk").attr("src", s.swSlash).css({
        transform: "rotate(0deg)", left: "-25px", bottom: "0px", width: "80px"});
      sd(ld[0] == 2 ? "GSwipe" : ld[0] == 3 ? "Punch" : "Swipe");
      if((mode != 3 || mode == 3 && pPos[0] == tPos[0]) && phase > 0){
        hurtYou((pPos[1] == 4 ? l.wpn[ld[0]][3]*2 : l.wpn[ld[0]][3])+pStats[0]);
        fpUp((tp("wpn0", 2) ? 9 : tp("wpn0", 5) ? 2 : 4)+pStats[2]);
      }
      if(tp("wpn0", 1))/**/setTimeout(_=> pGreat--,200);
      setTimeout(_=> {
        pHit[1] = false;
        $("#pAtk").hide();
        $("#p").css({"border-color": "transparent"});
        setTimeout(_=> {
          pHit[0] = true;
        }, 300);
      }, 300);
    }, 300);
  }
}

function special() {
  noSpecials = false;
  if(tp("itm1", 5) && canMove(l.itm[ld[1]][3], l.itm[ld[1]][5])) {
    move(l.itm[ld[1]][3], l.itm[ld[1]][5], true);
  }
  if(fp >= l.spc[ld[2]][4]) {
   $("#controls").fadeOut(5000);
   switch(l.spc[ld[2]][2]) {
      case 0: sGun(); break;
      case 1: sMist(); break;
      case 2: sHeal(); break;
      case 6: sGun(3); break;
     case 4: sGun(1); break;
      case 5: sGun(2); break;
   }
  }
}

function sGun(blood = 0) {
  guning++;
  if(guning >= 100)/**/unlock("eBGun", "spc", 3);
  fpUp(-1*l.spc[ld[2]][4]);
  if(blood != 3 && (mode != 3 || mode == 3 && pPos[0] == tPos[0])){
    hurtYou((pPos[1] == 0 && blood < 2 ? l.spc[ld[2]][3]*2 : l.spc[ld[2]][3])+pStats[1]/(blood == 2 ? 3 : 1));
  }
  l.spc[4][4]+=0.1;
  l.spc[4][3]+=0.1;
  l.spc[3][3] = blood ? l.spc[3][3]+0.2 : l.spc[3][3];
  if(blood == 1 && l.spc[3][3]+pStats[1] >= 10)unlock("eAuRp", "spc", 4);
  if(blood == 3) {
    sd("Angle");
    $("#p").css({'box-shadow': "0px 0px 50px 50px #25d"});
    setTimeout(_=> {
      $("#p").css({'box-shadow': "0px 0px 50px 25px #25d"});
      setTimeout(_=> {
        ouchers(0.5);
        hurtYou(l.spc[ld[2]][3]+pStats[1]*10);
        $("#p").css({'box-shadow': "none"}).append("<div class='pShot shot blood3' style='left:-90px;'></div>"); 
      },100);
    },250);
  }else {
    sd("Gun");
    $("#p").append("<div class='pShot shot blood"+blood+"' style='left: " +Math.random()*100+"%;'></div>");
  }
}

function sHeal() {
  pHeal = true;
  fpUp(-1*l.spc[ld[2]][4]);
  $("#p").css({'box-shadow': "0px 0px 50px #ffc"});
  sd("Heal");
  setTimeout(_=> {
    pHeal = false;
    $("#p").css({'box-shadow': "none"});
    if(!iFrm) {
      pHP = pHP+1 > pMax ? pMax : pHP+1;
      barUp();
      $("#p").css({background: pColor, "box-shadow": "0px 0px 50px #f47"});
      if(tp("itm1", 3) && pHP == pMax) {
        pStats[0] = st;
        pStats[1] = st;
      }
      pStats[0] += 5+pStats[1];
      setTimeout(_=> {
        pStats[0] -= 5+pStats[1];
        $("#p").css({'box-shadow': "none"});
      }, 6000);
    }
  }, 1500);
}

function sMist(per = 0) {
  if(!pMist[0] || per) {
    if(per) {
      pMist[2] = true;
      mistHb[2] = tPos[0]-1;
      mistHb[3] = tPos[1]+1;
    } else {
      mistHb[0] = pPos[0]-1;
      mistHb[1] = pPos[1]+1;
    }
    fpUp(!per ? -1*l.spc[ld[2]][4] : 0);
    sd("Mist");
    $("#arena").append('<div class="mist'+per+' gas"></div>');
    $(".mist"+per).css({left: (-65+(65*(per ? tPos[0] : pPos[0])))+"px", top: (135-(45*(per ? tPos[1] : pPos[1])))+"px"});
    setTimeout(_=> {
      pMist[per] = true;
      if(!per)/**/$(".mist0").css({opacity: "1"});
      else/**/$(".mist1").css({opacity: "1"});
    }, 1500);
    setTimeout(_=> {
      pMist[per] = false;
      pMist[2] = per ? false : pMist[2];
      if(!per)/**/$(".mist0").remove();
      else/**/$(".mist1").remove();
    }, 5500);
  }
}

function mistMurder() {
  mistHit(0, [0,1], l.spc[ld[2]][3]+pStats[1]);
  mistHit(1, [2,3], 3);
}

function mistHit(m, hb, dmg) {
  if(pMist[m]) {
    for(let i = mistHb[hb[0]]; i < mistHb[hb[0]]+3; i++) {
      for(let j = mistHb[hb[1]]; j > mistHb[hb[1]]-3; j--) {
        if(pos(pPos,[i,j]))/**/ouchers(1);
        if(pos(tPos,[i,j]) && mode == 3)/**/hurtYou(dmg);
      }
    }
    if(mistHb[1] == 5 && mode != 3 && m == 0)/**/hurtYou(dmg);
  }
}

function particle_Hit(whom) {
  if(particles) {
    let r = Math.random()*30+8;
    let id = "pr"+Math.round(Math.random()*1000);
    $("#"+whom).append("<div style='background: "+tColor+"; width: "+r+"px; height: "+r+"px;' class='parBoss "+id+"'></div>");
    $("."+id).animate({left: (Math.random()*200-100)+"px", bottom: (Math.random()*100)+"px"}, Math.round(Math.random()*200)+100, _=> {
      $("."+id).remove();
  });
    
  }
}

//damage trapoid
function hurtYou(dmg) {
  tHP -= dmg*(tp("itm1", 8) && Math.random() <= 0.05 ? 5 : 1);
  if(mode == 3) {
    for(let i = 0; i < dmg/2; i++) {
      particle_Hit("per");
    }
    $("#per").css({background: "#ddd4"});
    if(tHP < 1500 && tHP > 900)tColor = "#fb6";
    if(tHP < 900 && tHP > 400) {
      phase = 2;
      tColor = "#eb9";
    }
    if(tHP < 400)tColor = "#ca9"; 
  } else {
    for(let i = 0; i < dmg/2; i++) {
      particle_Hit("trapoid");
    }
    $("#trapoid").css({"border-top-color": "#ddd4"});
    
  }
  pissOff();
  barUp();
  if(pPos[1] == 4)/**/$("#pAtk").css({width: "100px"});//adjusting attack size
  if(tHP <= 0 && phase > 0) {
    if(phase == 1) phase2();
    else {
      if(mode == 3) {
        a.BTheme3.pause();
        unlock("iTDD", "itm", 3);
        $("#hint2").html('Type "giveme"');
        if(pHP == pMax) running = true;
        else $("#per").fadeOut(5000);
        if(ld[1] == 4) {
          unlock("iB2", "itm", 12);
          $("#newGame").show();
        }
        setTimeout(_=> {
          $("#dialouge, #next, #Ivy").fadeIn();
          $("#dialouge").html(IvyDial[IvyCnt]);
        }, 5100);
      } else {
        a.BTheme1.pause();
        if(ld[1] == 4) {
          $("#toIvy").show(); 
          localStorage.setItem('perf','perf=beat;');
        }
        if(mode == 2)/**/unlock("iLB", "itm", 5);
        if(pHP == pMax)unlock("eDagg", "wpn", 5);
        $("#toTrigon").show();
        localStorage.setItem('trig','trig=beat;');
        $("#trapoid").css({"animation-name": "none"}).fadeOut(5000);
        setTimeout(_=> {
          if(!credits[1]) {
            $('#container').fadeIn(4000, function() {
              $('#machine1').animate({'top': "-"+(300*credits[0]-80)+"px"
              }, 1200*credits[0], 'linear', function() {
                credits[1] = true;
                deathIsNowFinallyAMechanic();
                $("#container").fadeOut(4000);
              });
            });
          } else/**/ deathIsNowFinallyAMechanic();
        }, 5100);
      }
    }
    phase = -3;
    curAtk = null;
    atking = true;
    atkReset();
  }
  setTimeout(_=> {
    $("#trapoid").css({"border-top-color": tColor});
    $("#per").css({background: tColor});
  }, 20);
}

//------------------trapoid functions-----------------
function brit(h1, h2, h3) {
  if(sChan == 1 && pPos[0] != 4 && atkCnt == 4) {//spawn
    atkCnt = 1;
    sChan = 0;
    stab = 0;
    $(".stabTop").hide().css({"animation-duration" : "1s"});
    setTimeout(_=> { $(".stabTop").show();}, 50);
  }
  atkCnt++;
  $(".stab").show();
  if(atkCnt>=6) {
    for(let i in arguments) {
      if(pPos[0] == arguments[i] || pPos[0] == 0) {
        ouchers(1);
      }
    }
  }
  $("#stab2").css({"left": (12+h1*65)+"px"});
  $("#stab3").css({"left": (12+h2*65)+"px"});
  $("#stab4").css({"left": (12+h3*65)+"px"});
}

function weBall() {
  if(atkCnt == 0) {
    $(".circ").show();
    $(".pincerL").css({left: "-256px", opacity: "0.2"})
      .animate({left: "+=200px", opacity: "1"}, 900);
    $(".pincerR").css({left: "532px", opacity: "0.2"})
      .animate({left: "-=200px", opacity: "1"}, 900);
  }
  if(atkCnt >= 5) {
    for(let i = 1; i < 6; i++) {
      let b = hb["ball"+i][0];
      hb["ball"+i][0] = i%2 == 0 ? b-1 : b+1;
    }
    ballSmack();
    $(".pincerL").css({left: (7+65*hb.ball1[0])+"px"});
    $(".pincerR").css({left: (7+65*hb.ball2[0])+"px"});
  }
  atkCnt++;
}

function squared() {
  if(atkCnt === 0) {
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if(Math.random() < 0.5) {
          field.push([i,j]);
          $("#t"+i+j).addClass("hurt");
        }
      }
    }
  }
  if(atkCnt >= 4) {
    $(".hurt").css({background: "red"});
    for(let i in field) {
      if(pos(pPos,[field[i][0],field[i][1]]))/**/ouchers(1);
    }
  }
  atkCnt++;
}

function cubed() {
  let randy = Math.round(Math.random()*4);
  if(sqreCnt%8 == 0) {
    atkReset(0);
    for(let i = 0; i < 5; i++) {
      field[0] = randy;
      $("#t"+i+randy).addClass("hurt");
    }
  }
  if(sqreCnt%8 > 5) {
    $(".hurt").css({background: "red"});
    if(pPos[1] == field[0])/**/ouchers(1);
  }
  sqreCnt++;
}

function pissOff() {
  if(tHP <= push && phase == 1 && mode != 3) {
    push -= 77;
    sd("Push");
    $("#pTele").animate({opacity: "1"}, 750, _=> {
      $("#pTele").css({opacity: "0"});
      $("#push").show().css({top: "-215px"})
        .animate({top: "+=180px"}, 400, _=> {
          if(pPos[1] > 2 && phase == 1){
            noPush++;
            if(noPush >= 7)unlock("iAA", "itm", 11); 
            ouchers(1);
          }
          $("#push").fadeOut("250");
        });
    });
  }
}

function pissOn() {
  curAtk = null;
  $("#pTele").animate({opacity: "1"}, 1000, _=> {
    $("#pTele").css({opacity: "0"});
    $("#push").show().css({top: "-215px"})
      .animate({top: "+=225px"}, 500, _=>{
        atking = false;
        if(pPos[1] > 1 && phase == 2)/**/ouchers(1);
        $("#push").fadeOut("250");
      });
  });
}

// ----------------Perfetto-------------------------
function AICheck(type) {
  if(tHP < 900*gameCycle) {
    if(Math.random() < .30)/**/return 7;
    if(Math.random() < .75) {
      if(pPos[0] == tPos[0] && pPos[1] >= 3) {
        return Math.random()*4 > 2 ? 8 : 9+Math.round(Math.random());
      }
      switch(type) {
        case 1: return pPos[0] == tPos[0] || pPos[0] == tPos[0]-1 ? 10 : null;
        case 2: return pPos[1] >= 2 && pPos[0] >= tPos[0] ? 9 : null;
      }
    }
  }
  if(Math.random() < .33)/**/return 4;
  if(pPos[0] == tPos[0] && pPos[1] == 4) {
    return Math.random()*4 > 2 ? 5 : Math.ceil(Math.random()*2);
  }
  if(tHP < 400*gameCycle) {
    if(Math.random() < .13)/**/return 6;
  }
  switch(type) {
    case 0: return pos(pPos, [tPos[0]-1, 4]) || pos(pPos, [tPos[0]+1, 4]) || pos(pPos, [tPos[0], 3], true) ? 1 : null;
    case 1: return pos(pPos, [tPos[0], 4]) || pos(pPos, [tPos[0], 2]) ? 2 : null;
    case 2: return pos(pPos, [tPos[0], 0]) || pos(pPos, [tPos[0], 1]) ? 3 : null;
    case 3: return pos(pPos, [tPos[0], 4], true) ? 5 : null;
  }
}

function sideSlash() {
  comb++;
  curAtk = null;
  perWeapon(s.perGreatSw,blade,blade,-150,-110,-40);
  setTimeout(_=> {
    perWeapon(s.perGreatSw,blade,blade,-150,-110,-60);
  }, 50);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    for(let i = 0; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        if(pos(pPos, [i == 0 && j == 0 ? 9 : tPos[0]+j,4-i]))/**/ouchers(1);
      }
    }
    perWeapon(s.swSlash,200,160,-80,10,180);
    setTimeout(_=> {
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      wombo(r,0.3-(comb*.1), frontSlash, 0.6-(comb*.1), comEnd, .7, gigaSlash);
      if(r > .3 && r < .6-(comb*.1) && !pMist[2])/**/smoker();
      if(!(r > .6 && r < .7))/**/slash();
    }, 250);
  },550);
}

function comEnd() {
  if(pMist[2]) comb = -1;
}

function cycloneSlash() {
  comb++;
  curAtk = null;
  move(0, -1,false,"per");
  perWeapon(s.perGreatSw,blade,blade,-70,-100,80);
  setTimeout(_=> {
    perWeapon(s.perGreatSw,blade,blade,-70,-100,200);
  }, 200);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    for(let i = 0; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        if(pos(pPos, [i == 0 && j == 0 ? 9 : tPos[0]+j,4-i]))/**/ouchers(1);
      }
    }
    perWeapon(s.swSlash,220,270,-80,-100,200);
    setTimeout(_=> {
      move(0, 1,false,"per");
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      wombo(r,0.9-(comb*.1), quickSlash);
      slash();
    }, 250);
  },600);
}

function sweepSlash() {
  comb++;
  curAtk = null;
  perWeapon(s.perGreatSw,blade,blade,-20,-100,30);
  setTimeout(_=>perWeapon(s.perGreatSw,blade,blade,-20,-100,80), 200);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if(pos(pPos, [i == 0 && j == 1 || i == 2 && j == 0 ? 9 : tPos[0]+j,4-i]))/**/ouchers(1);
      }
    }
    perWeapon(s.swSlash,220,270,-20,-60,150);
    setTimeout(_=> {
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      wombo(r,0.6-(comb*.1), megaSlash, 0.8-(comb*.1), punchies, .9, gigaSlash);
      if(!(r > .6 && r < .7))/**/slash();
    }, 250);
  },650);
}

function quickSlash() {
  comb++;
  curAtk = null;
  perWeapon(s.perGreatSw,blade,blade,-150,-110,180);
  setTimeout(_=>perWeapon(s.perGreatSw,blade,blade,-150,-110,220), 100);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    for(let j = -1; j < 2; j++) {
      if(pos(pPos, [tPos[0]+j,4]))/**/ouchers(1);
    }
    perWeapon(s.swSlash,200,160,-80,-40,180);
    setTimeout(_=> {
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      wombo(r,0.5-(comb*.1), sideSlash, 0.51, schoolShooting);
      slash();
    }, 250);
  },450);
}

function punchies() {
  comb++;
  curAtk = null;
  perWeapon(s.fist,22,22,-20,10,-20);
  setTimeout(_=>perWeapon(s.fist,22,22,-20,-10,-20), 50);
  setTimeout(_=> {
    let r = Math.random();
    move(0, -1,false,"per");
    sd("Punch");
    for(let j = 0; j < 2; j++) {
      if(pos(pPos, [tPos[0],4-j]))/**/ouchers(0.5);
    }
    perWeapon(s.fist,22,22,-20,90,-20);
    setTimeout(_=> {
      perWeapon(s.fist,22,22,40,-10,-20);
      setTimeout(_=> {
        move(0, -1,false,"per");
        sd("Punch");
        perWeapon(s.fist,22,22,40,90,-20);
        for(let j = 0; j < 2; j++) {
          if(pos(pPos, [tPos[0],3-j]))/**/ouchers(0.5);
        }
        setTimeout(_=>move(0, 1,false,"per"), 195);
        setTimeout(_=> {
          move(0, 1,false,"per");
          perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
          wombo(r,0.6-(comb*.1), schoolShooting);
          slash();
        }, 250);
      }, 50);
    }, 100);
  },400);
}

function manHandle() {
  comb = -1;
  curAtk = null;
  perWeapon(s.fist,22,22,40,10,-20);
  sd("Punch");
  setTimeout(_=>perWeapon(s.fist,22,22,40,-10,-20), 50);
  setTimeout(_=> {
    if(pos(pPos, [tPos[0],tPos[1]-1]))/**/grab();
    perWeapon(s.fist,22,22,40,50,-20);
    setTimeout(_=> {
      if(mode == 3) {
        rest = 7;
        atking = false;
        perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
        slash();
      }
    },550);
  },800);
}

function grab() {
  mode = -1;
  setTimeout(_=>$("#p, #tAtk").css({top: "-=30"}),100)
  setTimeout(_=> {
    $("#p").css({height: "100px"});
    $("#tAtk").css({top: "+=60"})
    $("#p").animate({top: "169px", height: "50px"}, 300, _=> {
      rest = 1;
      pPos[1] = 0;               
      mode = 3;
      ouchers(1);
      atking = false;
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      slash();
    }); 
  }, 450);
}

function frontSlash() {
  comb++;
  curAtk = null;
  perWeapon(s.perGreatSw,220,220,-60,-150,10);
  setTimeout(_=>perWeapon(s.perGreatSw,220,220,-60,-150,30), 50);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    for(let j = 0; j < 3; j++) {
      if(pos(pPos, [tPos[0],4-j]))/**/ouchers(1);
    }
    perWeapon(s.swSlash,65,420,-10,-180,180);
    setTimeout(_=> {
      perWeapon(s.perGreatSw,220,200,-150,-110,-20);
      wombo(r,0.4-(comb*.1), quickSlash, 0.6-(comb*.1), dashSlash, .76, gigaSlash);
      if(!(r > .6 && r < .76))/**/slash();
    }, 250);
  },550);
}

function megaSlash() {
  comb++;
  curAtk = null;
  perWeapon(s.perGreatSw,blade,blade,-120,-170,10);
  setTimeout(_=>perWeapon(s.perGreatSw,blade,blade,-120,-170,30), 200);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    if(pPos[0] == tPos[0] || pPos[0] == tPos[0]-1)/**/ouchers(1);
    perWeapon(s.swSlash,145,620,-80,-260,180);
    setTimeout(_=> {
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      wombo(r,0.5-(comb*.1), cycloneSlash);
      slash();
    }, 250);
  },650);
}

function gigaSlash() {
  comb = -1;
  sd("Giga");
  perWeapon(s.perGreatSw,blade,blade,-150,-110,-50);
  setTimeout(_=> $("#tAtk").css({transform: "rotate(-70deg)"}), 550);
  setTimeout(_=> {
    let r = Math.random();
    sd("GSwipe");
    for(let i = 0; i < 3; i++) {
      for(let j = -2; j < 2; j++) {
        if(pos(pPos, [tPos[0]+j,4-i]))/**/ouchers(2);
      }
    }
    perWeapon(s.swSlash,800,450,-350,-220,180);
    setTimeout(_=> {
      rest = 5;
      atking = false;
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
    }, 450);
  },1210+(Math.ceil(Math.random()*10/9)-1)*2000);
}

function dashSlash() {
  comb = -1;
  slash(true);
  move(0, -1,false,"per");
  perWeapon(s.perGreatSw,blade,blade,-60,-150,10);
  setTimeout(_=> {
    perWeapon(s.perGreatSw,blade,blade,-60,-150,30);
  }, 100);
  setTimeout(_=> {
    sd("GSwipe");
    for(let i = 0; i < 5; i++) {
      for(let j = -1; j < 2; j++) {
        if(pos(pPos, [(i == 0 || i == 1) && j == 0 ? 9 : tPos[0]+j,4-i]))/**/ouchers(1);
      }
    }
    perWeapon(s.swSlash,250,460,-100,-180,180);
  },500);
}

function smoker() {
  let r = Math.random() < .3;
  curAtk = null;
  move(0, -1,false,"per");
  setTimeout(_=>{
    move(0, -1,false,"per");
    if(r) {
      setTimeout(_=>{
        move(0, -1,false,"per");
        setTimeout(_=>{
          move(0, -1,false,"per");
          if(phase > 0)sMist(1);
        }, 55);
      }, 55);
    } else {
      if(phase > 0)sMist(1);
    }
  }, 55);
  if(r) {
    setTimeout(_=>move(0, 1,false,"per"), 635);
    setTimeout(_=>move(0, 1,false,"per"), 690);
  }
  setTimeout(_=>move(0, 1,false,"per"), 745);
  setTimeout(_=> {
    move(0, 1,false,"per");
    atking = false;
  },800);
}

function healing() {
  curAtk = null;
  $("#per").css({'box-shadow': "0px 0px 50px #ffc"});
  sd("Boke");
  move(1, 0,false,"per");
  setTimeout(_=> {
    atking = false;
    $("#per").css({'box-shadow': "none"});
    tHP = tHP+100 > tMax ? tMax : tHP+100;
    barUp();
  }, 3000);
}

function schoolShooting() {
  curAtk = null;
  sd("Loaded");
  $("#per").css({'border-color': "white"});
  setTimeout(_=> {
    move(0, 1,false,"per");
    setTimeout(_=> {
      $("#per").css({'border-color': "transparent"});
      for(let i = 0; i < 3; i++) {
        if(pos(pPos, [tPos[0]+2,3-i]) || pos(pPos, [tPos[0]-2,3-i]))/**/ouchers(1);
      }
      if(pos(pPos, [tPos[0]-1,4]) || pos(pPos, [tPos[0]+1,4])|| pPos[0] == tPos[0])/**/ouchers(1);
      sd("Gun");
      $("#per").append("<div class='perShot shot' style='left:50%;'></div>",
                       "<div class='perShot shot' style='left:50%; transform: rotate(130deg)'></div>",
                       "<div class='perShot shot' style='left:50%; transform: rotate(230deg)'></div>");
      setTimeout(_=> {
        atking = false;
        move(0, -1,false,"per");
      }, 400);
    }, 450);
  }, 500);
}

function slash(dash = false) {
  curAtk = null;
  if(comb == -1) {
    setTimeout(_=> {
      rest = Math.round(Math.random()*3);
      atking = false;
      perWeapon(s.perGreatSw,blade,blade,-150,-110,-20);
      if(dash)/**/move(0, 1,false,"per");
    }, 800);
  }
}

function wombo(r) {
  let a = arguments;
  if(phase > 0) {
    for(let i = 1; i < a.length; i+=2) {//0-- 12 34 56
      if((i>2 ? r > a[i-2]+(comb*.1) : 1) && r < a[i]) {
        if(i+1 != a.length)a[i+1]();
        return;
      }
    }
  }
  comb = -1;
}

function perWeapon(s,w,h,l,t,r) {//sprite, width, height, left, top, rotate
  $("#tAtk").attr("src", s).css({width: w+"px", height: h+"px",
      left: l+"px", top: t+"px", transform: "rotate("+r+"deg)"});
}

function atkReset(sec = 1) {
  if(sec >= 1) {
    atkCnt = 0;
    hb.ball1 = [-1,0];
    hb.ball2 = [5,1];
    hb.ball3 = [-1,2];
    hb.ball4 = [5,3];
    hb.ball5 = [-1,4];
    $(".stab, .circ").fadeOut(100);
    $(".stabTop").css({"animation-duration" : "1.25s"});
    $("#ball3").css({top: "185px"});
    $("#ball4").css({top: "50px"});
  }
  if(sec == 2) {
    hb.ball1 = [-1,4];
    hb.ball3 = [-1,3];
    hb.ball5 = [-1,2];
    hb.ball2 = [5,1];
    hb.ball4 = [5,0];
    $("#ball3").css({top: "50px"});
    $("#ball4").css({top: "185px"});
  }
  if(sec <= 1) {
    field = [];
    $(".hurt").css({background: "#334"});
    $(".tile").removeClass("hurt");
  }
}

function tele/*vision? phone? tele what?*/(at) {
  switch(at) {
    case 0:
      $("#eye1, #eye2").animate({width: "10px", height: "30px"}, 200)
        .css({background: "#fb7"});
      $("#brow").hide();
      break;
    case 1:
      $("#eye1, #eye2").animate({width: "15px", "border-radius": "50%"}, 200)
        .css({background: "#fea"});
      break;
    case 2:
      if(phase == 2)/**/{
        $("#eye2, #eye1").animate({width: "5px"}, 200)
          .css({background: "#cde"});
        $("#brow").hide();
      } else $("#eye1, #eye2").animate({height: "9px"}, 200).css({background: "#f99"});
      break;
  }
  setTimeout(_=> {
    $("#eye1").css({width: "14px", height: "15px",});
    $("#eye2").css({width: "18px", height: "18px"});
    $("#eye1, #eye2").css({background: "#cfd", "border-radius": "0%"});
    $("#brow").show();
  }, 1000);
}
//end attack
function stopT() {
  if(atkCnt >= atkLen[curAtk]) {
    curAtk = null;
    atking = false;
  }
}

//take damage
function ouchers(dmg) {
  dmg *= tp("itm1", 9) && Math.random() <= 0.5 ? 0 : 1+(gameCycle-1)/2;
  if(!iFrm) {
    l.spc[4][4]=1;
    l.spc[4][3]=1;
    iFrm = true;
    sd(tp("itm1", 3) && pHP == pMax ? "Broke" : "Youch");
    pHP = (tp("itm1", 4) && pPos[1] < 3 || tp("itm1", 3) && pHP == pMax || ld[1] == "12") ? pHP-dmg/2 : pHP-dmg;
    pColor = pHP <=pMax/4 ? "#169" : pHP <= pMax/2 ? "#28c" : "#39f";
    pStats[0] = tp("itm1", 3) ? 0 : pStats[0];
    pStats[1] = tp("itm1", 3) ? 0 : pStats[1];
    $("#p, .tile").css({background: "#d677"});
    barUp();
    if(pHP <= 0) {
      deathIsNowFinallyAMechanic();
    }
    setTimeout(_=> {
      iFrm = false;
      $("#p").css({background: pColor});
      $(".tile").css({background: "#334"});
    }, 1000)
  }
}

// ----------------general use---------------------
function code(c) {
  if("giveme".indexOf(angu) >= 0 || angu == "") {
    angu+=c;
    if(angu == "giveme")unlock("eCann", "spc", 5);
  } 
  else angu = "";
}

function key(e, k1, k2, k3) {
  return e.which == k1 || e.which == k2 || e.which == k3;
}

function canMove(dir, d2) {
  return dir == 0 ?  pPos[1]+d2 > -1 && pPos[1]+d2 < 5 : pPos[0]+dir < 5 && pPos[0]+dir > -1;
}

function tp(ob, n) {
  return l[ob.substring(0,3)][ld[parseInt(ob.substring(3))]][2] == n;
}

function id(who) {
  return document.getElementById(who);
}

function pos(p1,bp1, sides = false) {
  if(sides)/**/return p1[0] >= bp1[0]-1 && p1[0] <= bp1[0]+1 && p1[1] == bp1[1];
  return p1[0] == bp1[0] && p1[1] == bp1[1];
}

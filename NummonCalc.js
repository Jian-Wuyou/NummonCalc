dojo.declare("classes.managers.NummonStatsManager", com.nuclearunicorn.core.TabManager, {
    
    game: null,
    lang: "en",
    i18ng: null,
    i18nData: {
        "en": {
            "catnip": "Catnip / Sec",

            "getCatnipInWarmSpring": "During Warm Spring",
            "getCatnipColdWinter": "During Cold Winter",

            "science": "Science",

            "getCelestialPerDay": "Chance of Celestial Events",
            "getCelestialAutoSuccess": "Celestial Event Auto Success Rate",
            "avgStarchartsFromCelestial" : "Avg. starcharts/sec from Celestial Event",
            "getMaxCompendiums": "Maximum Helpful Compendiums",
            "getBlueprintCraft": "Blueprints Per Craft",

            "titanium": "Titanium",

            "getTitPerZebraTrade": "Titanium Per Zebra Trade",
            "getZebraTradesLeftToMaxTit": "Trades Left to Cap Titanium",
            "getZebraTradesToMaxTit": "Max Zebra Trades to Cap Titanium",
            
            "unicorns": "Unicorns",

            "getBestUniBuilding": "Best Unicorn Building",
            "getBestAliBuilding": "Best Alicorn Building Per Ivory Cost",
            "getNecrocornsPerSecond": "Necrocorns Per Second",
            "getNecrocornTime": "Time Until Next Necrocorn",
            "getLeviChance": "Chance per year of Leviathans",

            "religion": "Religion",

            "getReligionProductionBonusCap": "Solar Revolution Limit (%)",
            "getNextTranscendTierProgress": "Progress to Next Transcendence Tier",
            "getApocryphaProgress": "Rec. Progress to Next Transcendence Tier",
            
            "paragon": "Paragon Bonus",

            "getParagonProductionBonus": "Production Bonus",
            "getParagonStorageBonus": "Storage Bonus",
            
            "time": "Time",

            "getTCPerSacrifice": "Time Crystals per Sacrifice",
            "getRelicPerTCRefine": "Relics Per Time Crystal Refine",
            "getTradeAmountAvg": "Time Crystal income expected value by Per.Combust TC",
            "getResourceRetrievalTCBackYears": "Next ResourceRetrieval get TC back of game years",
            
            "others": "Others",

            "getBestMagnetoBuilding": "Best Magneto/Steamwork Building",
            "getUraniumForThoriumReactors": "Uranium/Sec for Thorium Reactors",
            "getDarkFutureYears": "Years until Dark Future",
            "getBestRelicBuilding": "BlackCore/BlackNexus",
            "getGflops": "GFlops",
            "getAIlv15Time": "Time until AI level 15",

            "best.none": "No Building",
            "infinity": "Infinity",
            "sec": "/sec",
            "done": "Done",
        },
        "zh": {
            "catnip": "猫薄荷 / 秒",

            "getCatnipInWarmSpring": "暖春",
            "getCatnipColdWinter": "寒冬",

            "science": "科学",

            "getCelestialPerDay": "天文事件几率",
            "getCelestialAutoSuccess": "天文事件自动观测几率",
            "avgStarchartsFromCelestial" : "avgStarchartsFromCelestial",
            "getMaxCompendiums": "最大加成所需概要数量",
            "getBlueprintCraft": "每次工艺制作的蓝图",

            "titanium": "钛",

            "getTitPerZebraTrade": "每次和斑马贸易获得的钛",
            "getZebraTradesLeftToMaxTit": "达到钛上限的剩余斑马交易次数",
            "getZebraTradesToMaxTit": "达到钛上限的斑马交易次数",

            "unicorns": "独角兽",

            "getBestUniBuilding": "最佳独角兽建筑",
            "getBestAliBuilding": "象牙性价比最高天角兽建筑",
            "getNecrocornsPerSecond": "每秒获得的死灵兽",
            "getNecrocornTime": "距离下一个死灵兽的时间",
            "getLeviChance": "利维坦每年到来降临的几率",

            "religion": "宗教",

            "getReligionProductionBonusCap": "太阳革命极限加成(%)",
            "getNextTranscendTierProgress": "到达下一超越等级的进度",
            "getApocryphaProgress": "推荐下一超越等级的进度",

            "paragon": "领导力加成",

            "getParagonProductionBonus": "生产加成",
            "getParagonStorageBonus": "库存加成",

            "time": "时间",

            "getTCPerSacrifice": "每次献祭得到的时间水晶",
            "getRelicPerTCRefine": "每次时间水晶精炼得到遗物",
            "getTradeAmountAvg": "每跳一年的时间水晶收入",
            "getResourceRetrievalTCBackYears": "下个资源回复水晶回本需跳(年)",

            "others": "其他",

            "getBestMagnetoBuilding": "最佳磁电机/蒸汽工坊",
            "getUraniumForThoriumReactors": "钍反应堆每秒耗铀",
            "getDarkFutureYears": "距离黑暗未来到来年份",
            "getBestRelicBuilding": "获取最佳遗物建筑",
            "getGflops": "GFlops",
            "getAIlv15Time": "天网觉醒倒计时",

            "best.none": "无",
            "infinity": "∞",
            "sec": "/秒",
            "done": "已完成",
        },
    },

    i18n: function(key, args) {
        if (key[0] == "$")
            return this.i18ng(key.slice(1));
        value = this.i18nData[this.lang][key];
        if (!value) {
            value = this.i18nData["en"][key];
            if (!value) {
                console.error("key \"" + key + "\" not found");
                return "$" + key;
            }
            console.error("key \"" + key + "\" not found in " + this.lang);
        }
        if (args)
            for (var i = 0; i < args.length; i++)
                value = value.replace("{"+ i + "}", args[i]);
        return value;
    },
    
    roundThisNumber: function(num){
        num*=1000;
        num+=.5;
        num=Math.floor(num);
        num/=1000;
        return num;
    },
     
    getButton: function(tab, buttonName){
        for(var i in this.game.tabs[tab].buttons){
            if(this.game.tabs[tab].buttons[i].opts.building == buttonName)
                return parseInt(i);
        }
    },

    makeNiceString: function(num, numDigits = 3){
        if(typeof(num) == "number" && num != Infinity){
            num = num.toFixed(numDigits);
            num = num.toString();
            var decimal = num.substr(num.indexOf("."));
            if(decimal == "." + Array(numDigits + 1).join("0"))
                num = num.substr(0,num.indexOf("."));
            for(var i = (num.indexOf(".") != -1 ? num.indexOf(".") - 3 : num.length - 3); i > 0; i -= 3)
                num = num.substr(0,i) + "," + num.substr(i);
        }
        else
            num = num.toString();
        return num;
    },

    // CATNIP :

    getPotentialCatnip: function (number = 0.1) {
            var fieldProd = game.getEffect('catnipPerTickBase') * number;
            var vilProd = (game.village.getResProduction().catnip) ? game.village.getResProduction().catnip * (1 + game.getEffect('catnipJobRatio')) : 0;
            var baseProd = fieldProd + vilProd;

            var hydroponics = game.space.getBuilding('hydroponics').val;
            if (game.prestige.meta[0].meta[21].researched) {
                if (game.calendar.cycle === 2) {hydroponics *= 2;}
                if (game.calendar.cycle === 7) {hydroponics *= 0.5;}
            }
            var aqueduct = (game.bld.getBuildingExt('aqueduct').meta.stage === 0) ? game.bld.getBuildingExt('aqueduct').meta.val : 0;
            baseProd *= 1 + 0.03 * aqueduct + 0.025 * hydroponics;

            var paragonBonus = (game.challenges.currentChallenge == "winterIsComing") ? 0 : game.prestige.getParagonProductionRatio();
            baseProd *= 1 + paragonBonus;

            baseProd *= 1 + game.religion.getSolarRevolutionRatio();
            
            if (!game.opts.disableCMBR) {baseProd *= (1 + game.getCMBRBonus());}

            baseProd = game.calendar.cycleEffectsFestival({catnip: baseProd})['catnip'];
            baseProd *= 1 + (this.game.getEffect("blsProductionBonus") * this.game.resPool.get("sorrow").value);

            var baseDemand = game.village.getResConsumption()['catnip'];
            var uniPastures = game.bld.getBuildingExt('unicornPasture').meta.val;
            var pasture = (game.bld.getBuildingExt('pasture').meta.stage === 0) ? game.bld.getBuildingExt('pasture').meta.val : 0;
            baseDemand *= 1 + (game.getLimitedDR(pasture * -0.005 + uniPastures * -0.0015, 1.0));
            if (game.village.sim.kittens.length > 0 && game.village.happiness > 1) {
                var happyCon = Math.max(game.village.happiness - 1);
                if (game.challenges.currentChallenge == "anarchy") {
                    baseDemand *= 1 + happyCon * (1 + game.getEffect("catnipDemandWorkerRatioGlobal"));
                } else {
                    baseDemand *= 1 + happyCon * (1 + game.getEffect("catnipDemandWorkerRatioGlobal")) * (1 - game.village.getFreeKittens() / game.village.sim.kittens.length);
                }
            }
            baseProd += baseDemand;

            baseProd += game.getResourcePerTickConvertion('catnip');
            baseProd *= 5 * (1 + game.timeAccelerationRatio());
            return baseProd;
        },
    
    getCatnipColdWinter: function(){
        if (game.science.meta[1].meta[7].researched ==false ) {
          var catnip = this.getPotentialCatnip(0.1);
       } else {
          var catnip = this.getPotentialCatnip(0);
       }
        return catnip;
    },
    getCatnipInWarmSpring: function(){
        var catnip = this.getPotentialCatnip(1.65);
        return catnip;
    },

    // SCIENCE :
  
    getCelestialPerDay: function(){
        var chanceRatio = 1;
        if(this.game.prestige.getPerk("chronomancy").researched)
            chanceRatio *= 1.1;
        chanceRatio *= 1 + this.game.getEffect("timeRatio") * 0.25;
        
        var chance = 25;
        chance += this.game.getEffect("starEventChance") * 10000;
        chance *= chanceRatio;
        if(this.game.prestige.getPerk("astromancy").researched)
            chance *= 2;
        
        chance = Math.round(chance);
        chance /= 100;//It's out of 10,000 originally
        return chance + "%";
    },
    
    getCelestialAutoSuccess: function(){
        if (game.workshop.get("seti").researched)
            return "100%";
        var autoChance = game.getEffect("starAutoSuccessChance") * 100;
        if(game.prestige.getPerk("astromancy").researched)
            autoChance *= 2;
        if(autoChance > 100)
            autoChance = 100;
        return autoChance + "%";
    },

    avgStarchartsFromCelestial: function() {
        var chanceRatio = 1;
        if(game.prestige.getPerk("chronomancy").researched)
            chanceRatio *= 1.1;
        chanceRatio *= 1 + game.getEffect("timeRatio") * 0.25;
        
        var chance = 0.0025;
        chance += game.getEffect("starEventChance");
        chance *= chanceRatio;
        if(game.prestige.getPerk("astromancy").researched)
            chance *= 2;

        var autoChance = game.getEffect("starAutoSuccessChance");
        if(game.prestige.getPerk("astromancy").researched)
            autoChance *= 2;
        if(autoChance > 1 || game.workshop.get("seti").researched)
            autoChance = 1;
        
        return chance * autoChance / 2;
    },
        
    getMaxCompendiums: function(){
        var scienceBldMax = this.game.bld.getEffect("scienceMax");
        var compCap = this.game.bld.getEffect("scienceMaxCompendia");
        
        var IWRatio = this.game.ironWill ? 10 : 1;
        var blackLibrary = this.game.religion.getTU("blackLibrary");
        if(this.game.prestige.getPerk("codexLeviathanianus").researched){
            var ttBoostRatio = (0.05 * (1 + blackLibrary.val * (blackLibrary.effects["compendiaTTBoostRatio"] + this.game.getEffect("blackLibraryBonus"))));
            IWRatio *= (1 + ttBoostRatio * this.game.religion.transcendenceTier);
        }
        
        var compCapFinal = scienceBldMax * IWRatio + compCap;
        compCapFinal /= 10;
        return compCapFinal;
    },

    getBlueprintCraft: function(){
        return 1 + this.game.getResCraftRatio("blueprint");
    },

    // TITANIUM :

    getTitPerZebraTrade: function(){
        var shipAmount = this.game.resPool.get("ship").value;
        var zebraRelationModifierTitanium = this.game.getEffect("zebraRelationModifier") * 0.015;
        titaniumPerTrade = (1.5 + shipAmount * 0.03) * (1 + zebraRelationModifierTitanium);
        return titaniumPerTrade;
    },
    
    getZebraTradesToMaxTit: function(){
        var titaniumPerTrade = this.getTitPerZebraTrade();
        var maxTitanium = this.game.resPool.get("titanium").maxValue;
        return Math.ceil(maxTitanium / titaniumPerTrade);
    },
    
    getZebraTradesLeftToMaxTit: function(){
        var titaniumPerTrade = this.getTitPerZebraTrade();
        var titToFill = this.game.resPool.get("titanium").maxValue;
        titToFill -= this.game.resPool.get("titanium").value;
        titToFill = Math.ceil(titToFill / titaniumPerTrade);
        if(titToFill < 0)
            titToFill = 0;
        return titToFill;
    },

    // UNICORN :

    getBestUniBuilding: function(log=false){
        var unicornPastureKey = "$buildings.unicornPasture.label";
        var pastureButton = this.getButton(0, "unicornPasture");
        if(typeof pastureButton === "undefined")
             return this.i18n("best.none");
        var validBuildings = ["unicornTomb","ivoryTower","ivoryCitadel","skyPalace","unicornUtopia","sunspire"];
        var unicornsPerSecond = this.game.getEffect("unicornsPerTickBase") * this.game.getTicksPerSecondUI();
        var globalRatio = this.game.getEffect("unicornsGlobalRatio")+1;
        var religionRatio = this.game.getEffect("unicornsRatioReligion")+1;
        var paragonRatio = this.game.prestige.getParagonProductionRatio()+1;
        var faithBonus = this.game.religion.getSolarRevolutionRatio()+1;
        var cycle = 1;
        if(this.game.calendar.cycles[this.game.calendar.cycle].festivalEffects["unicorns"]!=undefined)
            if(this.game.prestige.getPerk("numeromancy").researched && this.game.calendar.festivalDays)
                cycle=this.game.calendar.cycles[this.game.calendar.cycle].festivalEffects["unicorns"];
        var onZig = Math.max(this.game.bld.getBuildingExt("ziggurat").meta.on,1);
        var total = unicornsPerSecond * globalRatio * religionRatio * paragonRatio * faithBonus * cycle;
        var baseUnicornsPerRift = 500 * (1 + this.game.getEffect("unicornsRatioReligion") * 0.1);
        var riftChanceRatio = 1;
        if(this.game.prestige.getPerk("unicornmancy").researched)
            riftChanceRatio *= 1.1;
        var baseRift = this.game.getEffect("riftChance") * riftChanceRatio / (10000 * 2) * baseUnicornsPerRift;
        if(log){
            console.log("Unicorns per second: "+total);
            console.log("Base rift per second average: "+baseRift);
        }
        var bestAmoritization = Infinity;
        var bestBuilding = "";
        var pastureAmor = this.game.bld.getBuildingExt("unicornPasture").meta.effects["unicornsPerTickBase"] * this.game.getTicksPerSecondUI();
        pastureAmor = pastureAmor * globalRatio * religionRatio * paragonRatio * faithBonus * cycle;
        if(log){
            console.log("unicornPasture");
            console.log("\tBonus unicorns per second: "+pastureAmor);
        }
        pastureAmor = this.game.tabs[0].buttons[pastureButton].model.prices[0].val / pastureAmor;
        if(log){
            var baseWait = gamePage.tabs[0].buttons[pastureButton].model.prices[0].val / total;
            var avgWait = gamePage.tabs[0].buttons[pastureButton].model.prices[0].val / (total + baseRift);
            console.log("\tMaximum time to build: " + gamePage.toDisplaySeconds(baseWait) + " | Average time to build: " + gamePage.toDisplaySeconds(avgWait));
            console.log("\tPrice: "+gamePage.tabs[0].buttons[pastureButton].model.prices[0].val+" | Amortization: "+gamePage.toDisplaySeconds(pastureAmor));
        }
        if(pastureAmor < bestAmoritization){
            bestAmoritization = pastureAmor;
            bestBuilding = unicornPastureKey;
        }
        for(var i in this.game.tabs[5].zgUpgradeButtons){
            var btn = this.game.tabs[5].zgUpgradeButtons[i];
            if(validBuildings.indexOf(btn.id)!=-1){
                if(btn.model.visible){
                    unicornPrice = 0;
                    for(var j in btn.model.prices){
                        if(btn.model.prices[j].name=="unicorns")
                            unicornPrice += btn.model.prices[j].val;
                        if(btn.model.prices[j].name=="tears")
                            unicornPrice += btn.model.prices[j].val * 2500 / onZig;
                    }
                    var bld=this.game.religion.getZU(btn.id);
                    var relBonus = religionRatio;
                    var riftChance = this.game.getEffect("riftChance");
                    for(var j in bld.effects){
                        if(j=="unicornsRatioReligion")
                            relBonus += bld.effects[j]
                        if(j=="riftChance")
                            riftChance += bld.effects[j];
                    }
                    var unicornsPerRift = 500 * ((relBonus -1) * 0.1 +1);
                    var riftBonus = riftChance * riftChanceRatio / (10000 * 2) * unicornsPerRift;
                    riftBonus -= baseRift;
                    var amor = unicornsPerSecond * globalRatio * relBonus * paragonRatio * faithBonus * cycle;
                    amor -= total;
                    amor = amor + riftBonus;
                    if(log){
                        console.log(btn.id);
                        console.log("\tBonus unicorns per second: "+amor);
                    }
                    amor = unicornPrice / amor;
                    if(log){
                        var baseWait = unicornPrice / total;
                        var avgWait = unicornPrice / (total + baseRift);
                        var amorSeconds = gamePage.toDisplaySeconds(amor);
                        if(amorSeconds == "")
                            amorSeconds = "NA";
                        console.log("\tMaximum time to build: " + gamePage.toDisplaySeconds(baseWait) + " | Average time to build: " + gamePage.toDisplaySeconds(avgWait));
                        console.log("\tPrice: "+unicornPrice + " | Amortization: "+amorSeconds);
                    }
                    if(amor < bestAmoritization)
                        if(riftBonus > 0 || relBonus > religionRatio && unicornPrice > 0){
                            bestAmoritization = amor;
                            bestBuilding = btn.id;
                        }
                }
            }
        }
        if (bestBuilding != unicornPastureKey)
            bestBuilding = "$religion.zu." + bestBuilding + ".label";
        return this.i18n(bestBuilding);
    },

    getBestAliBuilding: function() {
        var bestBuilding = ["best.none", "$religion.zu.skyPalace.label", "$religion.zu.unicornUtopia.label", "$religion.zu.sunspire.label"];
        if(!this.game.religion.getZU("skyPalace").unlocked)
            return this.i18n(bestBuilding[0]);
            
        var skyPalacePrice =  1.15**(this.game.religion.getZU("skyPalace").val) * 125;
        var unicornUtopiaPrice = 1.15**(this.game.religion.getZU("unicornUtopia").val) * 1000;
        var sunspirePrice = 1.15**(this.game.religion.getZU("sunspire").val) * 750;
        var priceBuilding = [skyPalacePrice, unicornUtopiaPrice, sunspirePrice];

        return this.i18n(bestBuilding[ priceBuilding.indexOf(Math.min(...priceBuilding)) + 1 ]);
    },
    
    getNecrocornsPerSecond: function(){
        var numAlicorns = this.game.resPool.get("alicorn").value;
        var curCorruption = this.game.religion.corruption;
        var blsBoost = 1 + Math.sqrt(this.game.resPool.get("sorrow").value * this.game.getEffect("blsCorruptionRatio"));
        var corruptionRate = 1;
        if(this.game.resPool.get("necrocorn").value > 0)
            corruptionRate = 0.25 * (1+ this.game.getEffect("corruptionBoostRatio"));
        corruptionRate *= this.game.getEffect("corruptionRatio") * blsBoost;
        if(numAlicorns <= 0){
            curCorruption = 0;
            corruptionRate = 0;
        }
        corruptionRate *= this.game.getTicksPerSecondUI();
        corruptionRate = Math.floor(corruptionRate * 100000) / 100000;
        if(corruptionRate == Infinity)
            return this.i18n("infinity");
        return corruptionRate + this.i18n("sec");
    },

    getNecrocornTime: function(){
        var numAlicorns = this.game.resPool.get("alicorn").value;
        var curCorruption = this.game.religion.corruption;
        var blsBoost = 1 + Math.sqrt(this.game.resPool.get("sorrow").value * this.game.getEffect("blsCorruptionRatio"));
        var corruptionRate = 1;
        if(this.game.resPool.get("necrocorn").value > 0)
            corruptionRate = 0.25 * (1 + this.game.getEffect("corruptionBoostRatio"));
        corruptionRate *= this.game.getEffect("corruptionRatio") * blsBoost;
        if(numAlicorns <= 0){
            curCorruption = 0;
            corruptionRate = 0;
        }
        if(corruptionRate == 0)
            return this.i18n("infinity");
        return this.game.toDisplaySeconds( (1 - curCorruption) / (corruptionRate * this.game.getTicksPerSecondUI()) );
    },

    getLeviChance: function(){
        var numPyramids = this.game.religion.getZU("blackPyramid").val;
        var numMarkers = this.game.religion.getZU("marker").val;
        var chance = this.roundThisNumber(35 * numPyramids * (1 + 0.1 * numMarkers) / 10);
        return chance + "%";
    },

    // RELIGION :

    getReligionProductionBonusCap: function(){
        var transcendTier = this.game.religion.transcendenceTier;
        var firstAtheismBonus = 0;
        var atheismBonus = 1;
        if(this.game.challenges.getChallenge("atheism").researched) {
            atheismBonus += this.game.getLimitedDR(this.game.getEffect("faithSolarRevolutionBoost"), 4);
            firstAtheismBonus += 20;
            }
        var numObelisks = this.game.religion.getTU("blackObelisk").val + firstAtheismBonus;
        var result = ((transcendTier * numObelisks * 5) + 1000) * atheismBonus;
        return result;
    },

    getApocryphaProgress: function() {
        var religion = this.game.religion;
        if (religion.transcendenceTier >= 354)
            return this.i18n("best.none");
        var tier = religion.transcendenceTier;
        var epiphanyCost = religion._getTranscendTotalPrice(tier + 1) - religion._getTranscendTotalPrice(tier);
        var obelisk = religion.getTU("blackObelisk").val;
        // (obeliskRatio - 1) is the percentage increase in the Solar Revolution cap
        var obeliskRatio = ((tier+1) * 5 * obelisk + 1000) / (tier * 5 * obelisk + 1000);
        // The increase in the adoration bonus from transcending
        var adoreIncreaseRatio = Math.pow((tier + 2) / (tier + 1), 2);
        var needpercent = adoreIncreaseRatio * obeliskRatio;
        var x = epiphanyCost;
        var k = needpercent;
        var epiphanyRecommend = 
              (1 - k + Math.sqrt(80 * (k * k - 1) * x + (k - 1)**2))
            * k / (40 * (k + 1) ** 2 * (k - 1))
            + x + x / (k * k - 1);
        var percent = epiphanyRecommend / epiphanyCost * 100;
        percent = Math.round(percent * 1000) / 1000;

        return percent + "%";
    },

    getNextTranscendTierProgress: function(){
        var religion = this.game.religion; 
        var tier = religion.transcendenceTier;
        var epiphanyCost = religion._getTranscendTotalPrice(tier + 1) - religion._getTranscendTotalPrice(tier);
        var perc = religion.faithRatio / epiphanyCost * 100;
        perc = Math.round(perc * 1000) / 1000;
        return perc + "%";
    },

    // PARAGON :

    getParagonProductionBonus: function(){
        var prodRatio = this.game.prestige.getParagonProductionRatio() * 100;
        prodRatio = Math.round(prodRatio * 1000) / 1000;
        return prodRatio + "%";
    },

    getParagonStorageBonus: function(){
        var storeRatio = this.game.prestige.getParagonStorageRatio();
        storeRatio = Math.round(storeRatio * 1000) / 1000;
        return storeRatio + "x";
    },
    
    //TIME : 

    getTCPerSacrifice: function(){
        var numTCPerSacrifice = 1;
        numTCPerSacrifice += this.game.getEffect("tcRefineRatio");
        return numTCPerSacrifice;
    },

    getRelicPerTCRefine: function(){
        return 1 + this.game.getEffect("relicRefineRatio") * this.game.religion.getZU("blackPyramid").getEffectiveValue(this.game);
    },
    
    getTradeAmountAvg: function(race) {
        var rRatio = 1 + 0.02 * this.game.diplomacy.get("leviathans").energy; //利维坦能量
        var tRatio = 1 + game.diplomacy.getTradeRatio() + game.diplomacy.calculateTradeBonusFromPolicies("leviathans",
            this.game); //贸易加成包括政策
        var unobtainium = 0.196 * game.getResourcePerTick("unobtainium"); //每年与贸易的难得素的产量
        var shatter = game.getEffect("shatterTCGain") * (1 + game.getEffect("rrRatio")); //耀变体*资源回复的效果
        var unPerTerade = shatter * unobtainium; //燃烧水晶每年获得的难得素
        var perterade = Math.floor(1000 * rRatio * tRatio * unPerTerade) / 1000; //燃烧时间水晶水晶收益
        return perterade;
    },

    getResourceRetrievalTCBackYears: function() {
        var shatterRe = 1 + this.game.getLimitedDR(this.game.getEffect("shatterCostReduction"),1); //千禧年挑战的收益
        var cycle;
        if (game.calendar.cycle == 5) { //判断周期
            cycle = this.getTradeAmountAvg() / (2.4 + 2.4 * game.getEffect("festivalRatio"));
        } else if (game.calendar.cycle == 0) {
            cycle = this.getTradeAmountAvg() / 0.9;
        } else {
            cycle = this.getTradeAmountAvg();
        }
        var timeC = cycle - (0.952 * shatterRe); //包括时间炉的收益
        var calendar = (56.5 + 12 * game.getEffect("festivalRatio")) / 50; //整个50年 卡戎和红月平衡的系数
        var result = calendar * timeC; //
        if (this.game.tabs[7].cfPanel.children[0].children[6].model == null)
            return this.i18n("best.none");
        var cost = this.game.tabs[7].cfPanel.children[0].children[6].model.prices[0].val; //下个资源回复所需要的的水晶
        var number = this.game.tabs[7].cfPanel.children[0].children[6].model.on; //点下个资源回复收益
        if (timeC > 0 && number > 0) {
            TCBack = Math.ceil(cost * number / result)
            return TCBack; 
        } else {
            return this.i18n("best.none");
        }
    },
    // OTHERS : 

    getBestMagnetoBuilding: function() {
        var bestBuilding = ["best.none", "$buildings.magneto.label", "$buildings.steamworks.label"];
        var magneto = this.game.bld.getBuildingExt("magneto").meta;
        var steamworks = this.game.bld.getBuildingExt("steamworks").meta;
        if(!magneto.unlocked || !steamworks.unlocked)
            return this.i18n(bestBuilding[0]);
        var magnetoCount = magneto.val; var steamworksCount = steamworks.val;
        var productionBonus = (1 + (steamworksCount * 0.15)) * (magnetoCount * 2) ;
        var prodBonusMagneto = (1 + (steamworksCount * 0.15)) * ((magnetoCount+1) * 2) ;
        var prodBonusSteam = (1 + ((steamworksCount+1) * 0.15)) * (magnetoCount * 2) ;
        var magnetoValue = (prodBonusMagneto - productionBonus) / 100 ;
        var steamworksValue = (prodBonusSteam - productionBonus) / 100 ;
        if(magnetoValue > steamworksValue)
            return this.i18n(bestBuilding[1]);
        else if (steamworksValue > magnetoValue)
            return this.i18n(bestBuilding[2]);
        return this.i18n(bestBuilding[0]);
    },
    
    getUraniumForThoriumReactors: function(){
        var needed = 250 * .1875 * this.game.bld.getBuildingExt("reactor").meta.val;
        needed /= 1 + this.game.getResCraftRatio({name:"thorium"});
        needed = Math.round(needed * 1000) / 1000;
        return needed;
    },

    getBestRelicBuilding: function() {
        if (!this.game.religion.getZU("blackPyramid").val) {
            return this.i18n("$religion.zu.blackPyramid.label");
        }
        if (this.game.tabs[5].zgUpgradeButtons.length == 0) {
            this.game.tabs[5].render();
        }
        var next;
        var cs = Math.floor(Math.log((12 + this.game.religion.getTU("blackCore").val) / 5) / Math.log(1.15)) + 1;
        if (game.challenges.meta[0].meta[6].on >= 1) {
            cs += 1;
        }
        var cs1 = 0;
        var cs2 = Math.ceil(this.game.tabs[5].zgUpgradeButtons[9].model.prices[2].val) - this.game.resPool.get("sorrow").maxValue;
        // 黑色连结价格
        var bnexus = this.game.tabs[5].ctPanel.children[0].children[1].model.prices[0].val;
        // 黑色核心价格
        var bcore = this.game.tabs[5].ctPanel.children[0].children[2].model.prices[0].val;
        // 下一个黑金字塔需要圣遗物数量
        var a = (Math.pow(1.15, cs2) - 1) / 0.15 * bcore;
        // 黑色连结提升产量
        var bnexusup = 0.001 * cs / bnexus;
        // 黑色核心提升产量
        var bcoreup = 0.001 * this.game.religion.getTU("blackNexus").val / a;
        if (cs2 > 0 && bnexusup >= bcoreup) {
            while (bnexusup >= bcoreup && bnexus < Number.MAX_VALUE / 1.15) {
                bnexus *= 1.15;
                bnexusup = 0.001 * cs / bnexus;
                bcoreup += 0.001 / a;
                cs1++;
            }
            next = this.i18n("$religion.tu.blackNexus.label") + cs1;
        } else {
            next = this.i18n("$religion.tu.blackCore.label") + cs2;
            if (cs2 < 1) {
                next = this.i18n("$religion.zu.blackPyramid.label");
            }
        }
        return next;
    },
    
    getDarkFutureYears: function(){
        var yearsLeft = this.game.calendar.darkFutureYears(true);
        return yearsLeft < 0 ? this.game.getDisplayValueExt(-yearsLeft) : this.i18n("done");
    },

    getGflops: function(){
        return game.resPool.get("gflops").value;
    },

    getAIlv15Time: function(){
        var lv15Gflops = Math.exp(14.5);
        var gflopsHave = this.game.resPool.get("gflops").value;
        var gflopsproduction = this.game.getEffect("gflopsPerTickBase") - this.game.getEffect("gflopsConsumption");
        if (this.game.bld.get("aiCore").effects["aiLevel"] >= 15)
            return this.i18n("done");
        if (gflopsproduction > 0)
            return this.game.toDisplaySeconds((lv15Gflops - gflopsHave) / (gflopsproduction * this.game.getTicksPerSecondUI()));//修复函数
        else
            return this.i18n("infinity");
    },
    
    //==============================================================================================================================================
    //Finally done with calculation functions, now to get down to adding it to the stats tab
    //==============================================================================================================================================
    
    stats: {
        catnip: [
            {
                name: "getCatnipInWarmSpring",
                // title: "During Warm Spring",
                val: 0,
            },
            {
                name: "getCatnipColdWinter",
                // title: "During Cold Winter",
                val: 0,
            }
        ],
        science: [
            {
                name: "getCelestialPerDay",
                // title: "Chance of Celestial Events",
                val: 0,
            },
            {
                name: "getCelestialAutoSuccess",
                // title: "Celestial Event Auto Success Rate",
                val: 0,
            },
            {
                name: "avgStarchartsFromCelestial",
                val: 0,
            },
            {
                name: "getMaxCompendiums",
                // title: "Maximum Helpful Compendiums",
                val: 0,
            },
            {
                name: "getBlueprintCraft",
                // title: "Blueprints Per Craft",
                val: 0,
            }
        ],
        titanium: [
            {
                name: "getTitPerZebraTrade",
                // title: "Titanium Per Zebra Trade",
                val: 0,
            },
            {
                name: "getZebraTradesLeftToMaxTit",
                // title: "Trades Left to Cap Titanium",
                val: 0,
            },
            {
                name: "getZebraTradesToMaxTit",
                // title: "Max Zebra Trades to Cap Titanium",
                val: 0,
            },
        ],
        unicorns: [
            {
                name: "getBestUniBuilding",
                // title: "Best Unicorn Building",
                val: 0,
            },
            {
                name: "getBestAliBuilding",
                // title: "Best Alicorn Building Per Ivory Cost",
                val: 0,
            },
            {
                name: "getNecrocornsPerSecond",
                // title: "Necrocorns Per Second",
                val: 0,
            },
            {
                name: "getNecrocornTime",
                // title: "Time Until Next Necrocorn",
                val: 0,
            },
            {
                name: "getLeviChance",
                // title: "Chance per year of Leviathans",
                val: 0,
            },
        ],
        religion: [
            {
                name: "getReligionProductionBonusCap",
                // title: "Solar Revolution Limit",
                val: 0,
            },
            {
                name: "getNextTranscendTierProgress",
                // title: "Apocrypha Progress",
                val: 0,
            },
            {
                name: "getApocryphaProgress",
                // title: "Progress to Next Transcendence Tier",
                val: 0,
            },
        ],
        paragon: [
            {
                name: "getParagonProductionBonus",
                // title: "Production Bonus",
                val: 0,
            },
            {
                name: "getParagonStorageBonus",
                // title: "Storage Bonus",
                val: 0,
            },
        ],
        time: [
            {
                name: "getTCPerSacrifice",
                // title: "Time Crystals per Sacrifice",
                val: 0,
            },
            {
                name: "getRelicPerTCRefine",
                // title: "Relics Per Time Crystal Refine",
                val: 0,
            },
            {
                name: "getTradeAmountAvg",
                // title: "Blazars for Shatter Engine",
                val: 0,
            },
            {
                name: "getResourceRetrievalTCBackYears",
                // title: "Blazars for Shatter Engine",
                val: 0,
            },
        ],
        others: [
            {
                name: "getBestMagnetoBuilding",
                // title: "Best Magneto/Steamwork Building",
                val: 0,
            },
            {
                name: "getUraniumForThoriumReactors",
                // title: "Uranium/Sec for Thorium Reactors",
                val: 0,
            },
            {
                name: "getDarkFutureYears",
                // title: "Years untile Dark Future",
                val: 0,
            },
            {
                name: "getBestRelicBuilding",
                //title: "Besting building for increase relic",
                val: 0,
            },
            {
                name: "getGflops",
                // title: "GFlops",
                val: 0,
            },
            {
                name: "getAIlv15Time",
                val: 0,
            }
        ]  
    },

    statDefinitions : [
        {
            name: "catnip",
            // title: "Catnip / Sec"
        },
        {
            name: "science",
            // title: "Science"
        },
        {
            name: "titanium",
            // title: "Titanium"
        },
        {
            name: "unicorns",
            // title: "Unicorns"
        },
        {
            name: "religion",
            // title: "Religion"
        },
        {
            name: "paragon",
            // title: "Paragon Bonus"
        },
        {
            name: "time",
            // title: "Time"
        },
        {
            name: "others",
            // title: "Others"
        }
    ],
    
    statGroups: null,
    
    constructor: function(game, i18ng, lang){
        this.game = game;
        this.i18ng = i18ng;
        this.statGroups = [];
        var self = this;
        if (lang && this.i18nData[lang])
            this.lang = lang;
        else
            this.lang = "en";
            
        this.statDefinitions.forEach(
            function(statDefinition) {
                self.statGroups.push(
                    {
                        group: self.stats[statDefinition.name],
                        title: self.i18n(statDefinition.name)
                    }
                )
            }
        )
        
        for(var i in this.statGroups){
            for(var j in this.statGroups[i].group){
                this.statGroups[i].group[j].calculate = this[this.statGroups[i].group[j].name];
            }
        }
    },
    
    getStat: function(name){
        return this[name]();
    },
    
    save: function(saveData){
    },
    
    load: function(saveData){
    },
    
    resetState: function(){
    }
});

dojo.declare("classes.tab.NummonTab", com.nuclearunicorn.game.ui.tab, {
    
    container: null,
    
    constructor: function(tabName){
    },
    
    render: function(content){
        this.container = content;
        
        this.update();
    },
    
    update: function(){
        dojo.empty(this.container);
        
        for(var idx in this.game.nummon.statGroups){
            var statGroup = this.game.nummon.statGroups[idx];
            dojo.create("h1", {
                innerHTML: statGroup.title
            }, this.container);
            
            var stats = statGroup.group;
            var table = dojo.create("table", {class: 'statTable'}, this.container);
            
            for(var i in stats){
                var stat = stats[i];
                var val = stat.val;
                if(val == Infinity)
                    val = "Infinity";
                
                stat.val = this.game.nummon[stat.name]();
                
                var tr = dojo.create("tr", null, table);
                dojo.create("td", {
                    innerHTML: this.game.nummon.i18n(stat.name)
                }, tr);
                dojo.create("td", {
                    innerHTML: typeof val == "number" ? this.game.getDisplayValueExt(val) : val
                }, tr);
            }
        }
    }
});

NummonInit = function(){
    var i18ng = $I;
    var lang = localStorage["com.nuclearunicorn.kittengame.language"];
    var managers = [
        {
            id: "nummon", class: "NummonStatsManager"
        }
    ];
    for(var i in managers){
        var manager = managers[i];
        if(gamePage[manager.id] == undefined){
            gamePage[manager.id] = new window["classes"]["managers"][manager.class](gamePage, i18ng, lang);
            gamePage.managers.push(gamePage[manager.id]);
        }
        else{
            gamePage[manager.id] = new window["classes"]["managers"][manager.class](gamePage, i18ng, lang);
        }
    }
    
    gamePage.nummonTab = new classes.tab.NummonTab({name: "Nummon", id: "Nummon"}, gamePage);
    gamePage.nummonTab.visible = true;
    var tabExists = false;
    for(var i in gamePage.tabs)
        if(gamePage.tabs[i].tabName == "Nummon"){
            gamePage.tabs[i] == gamePage.nummonTab;
            tabExists = true;
        }
    if(!tabExists)
        gamePage.addTab(gamePage.nummonTab);
    
    gamePage.getTab = function(name){
        switch(name) {
            case "science":
                return this.libraryTab;
            case "village":
                return this.villageTab;
            case "workshop":
                return this.workshopTab;
            case "space":
                return this.spaceTab;
            case "stats":
                return this.statsTab;
            case "nummon":
                return this.nummonTab;
            case "time":
                return this.timeTab;
        }
    };
    
    gamePage.ui.render();
}

NummonTryInit = function() {
    if (typeof gamePage === "undefined") {
        setTimeout(function(){
            NummonTryInit();
        }, 2000);
    } else {
        NummonInit();
    }
}

NummonTryInit();
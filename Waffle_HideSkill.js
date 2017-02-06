//=========
// Waffle Plugins - Hide Skill Types With No Skills
// Waffle_HideSkill.js
//=========

var Imported = Imported || {};
Imported.Waffle_HideSkill = true;

var Waffle = Waffle || {};
Waffle.WHS = Waffle.WHS || {};
Waffle.WHS.version = 1.0;

//=========
/*:
 * @plugindesc v1.0 Hides skill types if no skills of that type are learned.
 * @author WaffleSoft
 *
*/
//=========

Game_Actor.prototype.hasSkillWithType = function(stypeId) {
	return this.skills().map(function(skill) {
		return skill.stypeId;
	}).contains(stypeId);
};

// remove skill from list in battle
Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b) {
        return a - b;
    });
    skillTypes.forEach(function(stypeId) {
        var name = $dataSystem.skillTypes[stypeId];
        // check if any skills are learned
        if(this._actor.hasSkillWithType(stypeId)) {
        	this.addCommand(name, 'skill', true, stypeId);
    	}
    }, this);
};

// remove skill type from list out of battle
Window_SkillType.prototype.makeCommandList = function() {
    if (this._actor) {
        var skillTypes = this._actor.addedSkillTypes();
        skillTypes.sort(function(a, b) {
            return a - b;
        });
		skillTypes.forEach(function(stypeId) {
	        var name = $dataSystem.skillTypes[stypeId];
	        // check if any skills are learned
	        if(this._actor.hasSkillWithType(stypeId)) {
	        	this.addCommand(name, 'skill', true, stypeId);
	    	}
	    }, this);
    }
    if (this.findExt('learnSkills') === -1) this.addLearnSkillsCommand();
};
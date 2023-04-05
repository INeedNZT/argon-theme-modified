let translation = {};

translation['en_US'] = require('./en_US.js').translations;
translation['zh_TW'] = require('./zh_TW.js').translations;

export const __ = (text) => {
	let lang = argon_language;
	if (typeof(translation[lang]) == "undefined"){
		return text;
	}
	if (typeof(translation[lang][text]) == "undefined"){
		return text;
	}
	return translation[lang][text];
}
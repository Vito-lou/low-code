export var KeyCode;
(function (KeyCode) {
    KeyCode["Backspace"] = "Backspace";
    KeyCode["Tab"] = "Tab";
    KeyCode["Enter"] = "Enter";
    KeyCode["Shift"] = "Shift";
    KeyCode["Control"] = "Control";
    KeyCode["Alt"] = "Alt";
    KeyCode["CapsLock"] = "CapsLock";
    KeyCode["Escape"] = "Escape";
    KeyCode["Space"] = " ";
    KeyCode["PageUp"] = "PageUp";
    KeyCode["PageDown"] = "PageDown";
    KeyCode["End"] = "End";
    KeyCode["Home"] = "Home";
    KeyCode["ArrowLeft"] = "ArrowLeft";
    KeyCode["ArrowUp"] = "ArrowUp";
    KeyCode["ArrowRight"] = "ArrowRight";
    KeyCode["ArrowDown"] = "ArrowDown";
    KeyCode["Left"] = "Left";
    KeyCode["Up"] = "Up";
    KeyCode["Right"] = "Right";
    KeyCode["Down"] = "Down";
    KeyCode["Insert"] = "Insert";
    KeyCode["Delete"] = "Delete";
    KeyCode["Zero"] = "0";
    KeyCode["ClosedParen"] = ")";
    KeyCode["One"] = "1";
    KeyCode["ExclamationMark"] = "!";
    KeyCode["Two"] = "2";
    KeyCode["AtSign"] = "@";
    KeyCode["Three"] = "3";
    KeyCode["PoundSign"] = "\u00A3";
    KeyCode["Hash"] = "#";
    KeyCode["Four"] = "4";
    KeyCode["DollarSign"] = "$";
    KeyCode["Five"] = "5";
    KeyCode["PercentSign"] = "%";
    KeyCode["Six"] = "6";
    KeyCode["Caret"] = "^";
    KeyCode["Hat"] = "^";
    KeyCode["Seven"] = "7";
    KeyCode["Ampersand"] = "&";
    KeyCode["Eight"] = "8";
    KeyCode["Star"] = "*";
    KeyCode["Asterisk"] = "*";
    KeyCode["Nine"] = "9";
    KeyCode["OpenParen"] = "(";
    KeyCode["a"] = "a";
    KeyCode["b"] = "b";
    KeyCode["c"] = "c";
    KeyCode["d"] = "d";
    KeyCode["e"] = "e";
    KeyCode["f"] = "f";
    KeyCode["g"] = "g";
    KeyCode["h"] = "h";
    KeyCode["i"] = "i";
    KeyCode["j"] = "j";
    KeyCode["k"] = "k";
    KeyCode["l"] = "l";
    KeyCode["m"] = "m";
    KeyCode["n"] = "n";
    KeyCode["o"] = "o";
    KeyCode["p"] = "p";
    KeyCode["q"] = "q";
    KeyCode["r"] = "r";
    KeyCode["s"] = "s";
    KeyCode["t"] = "t";
    KeyCode["u"] = "u";
    KeyCode["v"] = "v";
    KeyCode["w"] = "w";
    KeyCode["x"] = "x";
    KeyCode["y"] = "y";
    KeyCode["z"] = "z";
    KeyCode["A"] = "A";
    KeyCode["B"] = "B";
    KeyCode["C"] = "C";
    KeyCode["D"] = "D";
    KeyCode["E"] = "E";
    KeyCode["F"] = "F";
    KeyCode["G"] = "G";
    KeyCode["H"] = "H";
    KeyCode["I"] = "I";
    KeyCode["J"] = "J";
    KeyCode["K"] = "K";
    KeyCode["L"] = "L";
    KeyCode["M"] = "M";
    KeyCode["N"] = "N";
    KeyCode["O"] = "O";
    KeyCode["P"] = "P";
    KeyCode["Q"] = "Q";
    KeyCode["R"] = "R";
    KeyCode["S"] = "S";
    KeyCode["T"] = "T";
    KeyCode["U"] = "U";
    KeyCode["V"] = "V";
    KeyCode["W"] = "W";
    KeyCode["X"] = "X";
    KeyCode["Y"] = "Y";
    KeyCode["Z"] = "Z";
    KeyCode["Meta"] = "Meta";
    KeyCode["LeftWindowKey"] = "Meta";
    KeyCode["RightWindowKey"] = "Meta";
    KeyCode["Numpad0"] = "0";
    KeyCode["Numpad1"] = "1";
    KeyCode["Numpad2"] = "2";
    KeyCode["Numpad3"] = "3";
    KeyCode["Numpad4"] = "4";
    KeyCode["Numpad5"] = "5";
    KeyCode["Numpad6"] = "6";
    KeyCode["Numpad7"] = "7";
    KeyCode["Numpad8"] = "8";
    KeyCode["Numpad9"] = "9";
    KeyCode["Multiply"] = "*";
    KeyCode["Add"] = "+";
    KeyCode["Subtract"] = "-";
    KeyCode["DecimalPoint"] = ".";
    KeyCode["MSDecimalPoint"] = "Decimal";
    KeyCode["Divide"] = "/";
    KeyCode["F1"] = "F1";
    KeyCode["F2"] = "F2";
    KeyCode["F3"] = "F3";
    KeyCode["F4"] = "F4";
    KeyCode["F5"] = "F5";
    KeyCode["F6"] = "F6";
    KeyCode["F7"] = "F7";
    KeyCode["F8"] = "F8";
    KeyCode["F9"] = "F9";
    KeyCode["F10"] = "F10";
    KeyCode["F11"] = "F11";
    KeyCode["F12"] = "F12";
    KeyCode["NumLock"] = "NumLock";
    KeyCode["ScrollLock"] = "ScrollLock";
    KeyCode["SemiColon"] = ";";
    KeyCode["Equals"] = "=";
    KeyCode["Comma"] = ",";
    KeyCode["Dash"] = "-";
    KeyCode["Period"] = ".";
    KeyCode["UnderScore"] = "_";
    KeyCode["PlusSign"] = "+";
    KeyCode["ForwardSlash"] = "/";
    KeyCode["Tilde"] = "~";
    KeyCode["GraveAccent"] = "`";
    KeyCode["OpenBracket"] = "[";
    KeyCode["ClosedBracket"] = "]";
    KeyCode["Quote"] = "'";
})(KeyCode || (KeyCode = {}));
export const getKeyCodeFromEvent = (event) => {
    return event.key;
};

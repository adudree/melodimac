var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var gui = new dat.GUI();
var params = {
    dureeNote: 0.5,
    steps_RNN: 12,
    temperature_RNN: 1.1,
    tempo: 95.0
};
gui.add(params, "dureeNote", 0.5, 4, 0.5);
gui.add(params, "steps_RNN", 4, 24, 4);
gui.add(params, "temperature_RNN", 0.1, 1.5, 0.1);
gui.add(params, "tempo", 40, 180, 1);
var checkPoint = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/';
var modele = 'melody_rnn';
var modeleRNN = checkPoint.concat(modele);
var melodyRNN = new mm.MusicRNN(modeleRNN);
var ownComp = {
    notes: [],
    totalTime: 0.
};
var keyboardValue = {
    "q": 60,
    "z": 61,
    "s": 62,
    "e": 63,
    "d": 64,
    "f": 65,
    "t": 66,
    "g": 67,
    "y": 68,
    "h": 69,
    "u": 70,
    "j": 71,
    "k": 72,
    "Q": 60,
    "Z": 61,
    "S": 62,
    "E": 63,
    "D": 64,
    "F": 65,
    "T": 66,
    "G": 67,
    "Y": 68,
    "H": 69,
    "U": 70,
    "J": 71,
    "K": 72
};
var keyboardColor = {
    "q": "#d7323e",
    "z": "#dd704a",
    "s": "#e0a952",
    "e": "#f4d45c",
    "d": "#ffe868",
    "f": "#e5e252",
    "t": "#c1e562",
    "g": "#9ad570",
    "y": "#5fc771",
    "h": "#589c5d",
    "u": "#44746c",
    "j": "#156b76",
    "k": "#1e5598",
    "Q": "#d7323e",
    "Z": "#dd704a",
    "S": "#e0a952",
    "E": "#f4d45c",
    "D": "#ffe868",
    "F": "#e5e252",
    "T": "#c1e562",
    "G": "#9ad570",
    "Y": "#5fc771",
    "H": "#589c5d",
    "U": "#44746c",
    "J": "#156b76",
    "K": "#1e5598"
};
var rnn_steps = params.steps_RNN;
var rnn_temp = params.temperature_RNN;
var dureeNote = params.dureeNote;
var tempo = params.tempo;
var piano = "https://storage.googleapis.com/magentadata/js/soundfonts/salamander";
var playerPiano = new mm.SoundFontPlayer(piano);
function draw() {
    rnn_steps = params.steps_RNN;
    rnn_temp = params.temperature_RNN;
    dureeNote = params.dureeNote;
    tempo = params.tempo;
}
var suiteMelodie = function () { return __awaiter(_this, void 0, void 0, function () {
    var quantizedSequence, impro, musique_1, playMelodieIa, stopMelodyIA, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4, melodyRNN.initialize()];
            case 1:
                _a.sent();
                quantizedSequence = mm.sequences.quantizeNoteSequence(ownComp, 1);
                return [4, melodyRNN.continueSequence(quantizedSequence, rnn_steps, rnn_temp)];
            case 2:
                impro = _a.sent();
                impro.totalTime = 1;
                return [4, mm.sequences.concatenate([quantizedSequence, impro])];
            case 3:
                musique_1 = _a.sent();
                displayPlayer(musique_1, 'canvasMelodyIA');
                playMelodieIa = document.getElementById('playIA').onclick = function () {
                    playerPiano.loadSamples(musique_1).then(function () {
                        playerPiano.setTempo(tempo);
                        playerPiano.start(musique_1);
                    });
                };
                stopMelodyIA = document.getElementById('stopIA').onclick = function () {
                    playerPiano.stop(musique_1);
                };
                document.getElementById('melodyIA').style.display = 'block';
                displayPlayer(musique_1, 'canvasMelodyIA');
                isDisplayed = true;
                return [3, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
var isDisplayed = false;
var compEncours = false;
var finComp = false;
var playMelody = document.getElementById('play').onclick = function () {
    if (finComp == true) {
        playerPiano.loadSamples(ownComp).then(function () {
            playerPiano.setTempo(tempo);
            playerPiano.start(ownComp);
        });
    }
};
var stopMelody = document.getElementById('stop').onclick = function () {
    if (finComp == true) {
        playerPiano.stop(ownComp);
    }
};
var createMelodyIA = document.getElementById('calculateMelodyIA').onclick = function () {
    if (isDisplayed)
        document.getElementById('melodyIA').style.display = 'none';
    suiteMelodie();
    isDisplayed = !isDisplayed;
};
var afficherMelodyIA = document.getElementById('melodyIA');
afficherMelodyIA.style.display = "none";
var afficherVizComp = document.getElementById("vizComposition");
afficherVizComp.style.display = "none";
document.getElementById("newMelody").onclick = function () { window.location.reload(); };
document.getElementById("newMelody2").onclick = function () { window.location.reload(); };
function setup() {
    p6_CreateCanvas();
    textAlign(LEFT);
}
function windowResized() {
    p6_ResizeCanvas();
}
document.getElementById("startComp").onclick = function () {
    compEncours = true;
};
document.getElementById("stopComp").onclick = function () {
    compEncours = false;
    finComp = true;
    document.getElementById('startComp').style.removeProperty('background');
    displayPlayer(ownComp, 'melody');
    console.log(ownComp);
    afficherVizComp.style.display = "block";
};
function displayPlayer(musique, id) {
    var config = {
        noteHeight: 6,
        pixelsPerTimeStep: 30,
        noteSpacing: 1,
        noteRGB: '8, 41, 64',
        activeNoteRGB: '240, 84, 119',
    };
    var viz = new mm.PianoRollCanvasVisualizer(musique, document.getElementById(id), config);
}
var noteMusique;
var playerNote = new mm.SoundFontPlayer(piano);
function colorNote(key) {
    document.getElementById(key).style.background = keyboardColor[key];
}
function removeColor(key) {
    document.getElementById(key).style.removeProperty('background');
}
function keyPressed() {
    if (compEncours) {
        if (key in keyboardValue) {
            colorNote(key);
            noteMusique = keyboardValue[key];
            var totTime = ownComp["totalTime"];
            var note = {
                pitch: noteMusique,
                startTime: totTime,
                endTime: totTime += dureeNote
            };
            var noteUnique_1 = {
                notes: [
                    {
                        pitch: noteMusique, startTime: 0., endTime: dureeNote
                    }
                ],
                totalTime: dureeNote
            };
            playerNote.loadSamples(noteUnique_1).then(function () {
                if (playerNote.isPlaying()) {
                    playerNote.stop(noteUnique_1);
                }
                playerNote.start(noteUnique_1);
            });
            ownComp["notes"].push(note);
            ownComp["totalTime"] += dureeNote;
        }
    }
    if (key === 'h') {
        dat.GUI.toggleHide();
    }
    return false;
}
function keyReleased() {
    if (compEncours && key in keyboardValue) {
        removeColor(key);
    }
    return false;
}
var __MARGIN_SIZE = 0;
function __desiredCanvasWidth() {
    return windowWidth - __MARGIN_SIZE * 2;
}
function __desiredCanvasHeight() {
    return windowHeight - __MARGIN_SIZE * 2;
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map
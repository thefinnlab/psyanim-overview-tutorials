import { initJsPsych } from 'jspsych';

import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

import { 
    PsyanimApp, 
    PsyanimJsPsychPlugin,
    PsyanimFirebaseClient

} from 'psyanim2';

// import firebaseJsonConfig from '../firebase.config.json';

import EmptyScene from './EmptyScene';
import MyFirstScene from './MyFirstScene';

/**
 *  Handle user authentication and any other configuration
 */
const userID = 'Jason';
const experimentName = 'defaultExperimentName';

/**
 *  Setup Psyanim App
 */
PsyanimApp.Instance.config.registerScene(EmptyScene);
PsyanimApp.Instance.config.registerScene(MyFirstScene);

PsyanimApp.Instance.run();

PsyanimApp.Instance.setCanvasVisible(false);

/**
 *  Setup PsyanimJsPsychPlugin
 */
PsyanimJsPsychPlugin.setUserID(userID);
PsyanimJsPsychPlugin.setExperimentName(experimentName);

// const firebaseClient = new PsyanimFirebaseClient(firebaseJsonConfig);
// PsyanimJsPsychPlugin.setDocumentWriter(firebaseClient);

/**
 *  Setup jsPsych experiment
 */
const jsPsych = initJsPsych();

let welcome = {
    type: htmlKeyboardResponse,
    stimulus: 'Welcome to the experiment.  Press any key to begin.'
};

let emptySceneTrial = {
    type: PsyanimJsPsychPlugin,
    sceneKey: EmptyScene.key,
};

let myFirstSceneTrial = {
    type: PsyanimJsPsychPlugin,
    sceneKey: MyFirstScene.key,
};

let goodbye = {
    type: htmlKeyboardResponse,
    stimulus: 'Congrats - you have completed your first experiment!  Press any key to end this trial.'
};

jsPsych.run([welcome, emptySceneTrial, myFirstSceneTrial, goodbye]);
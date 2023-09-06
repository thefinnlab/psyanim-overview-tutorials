import { initJsPsych } from 'jspsych';

import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

import { 
    PsyanimApp, 
    PsyanimJsPsychPlugin,
    PsyanimFirebaseClient

} from 'psyanim2';

// import firebaseJsonConfig from '../firebase.config.json';

import MyFirstScene from './MyFirstScene';
import InteractiveEvadeAgent from './InteractiveEvadeAgent';
import MyArriveScene from './MyArriveScene';
import MyArriveAgentPrefabScene from './MyArriveAgentPrefabScene';

/**
 *  Handle user authentication and any other configuration
 */
const userID = 'Jason';
const experimentName = 'defaultExperimentName';

/**
 *  Setup Psyanim App
 */
PsyanimApp.Instance.config.registerScene(MyFirstScene);
PsyanimApp.Instance.config.registerScene(InteractiveEvadeAgent);
PsyanimApp.Instance.config.registerScene(MyArriveScene);
PsyanimApp.Instance.config.registerScene(MyArriveAgentPrefabScene);

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

let myFirstSceneTrial = {
    type: PsyanimJsPsychPlugin,
    sceneKey: MyFirstScene.key,
};

let interactiveEvadeAgentTrial = {
    type: PsyanimJsPsychPlugin,
    sceneKey: InteractiveEvadeAgent.key,
};

let arriveSceneTrial = {
    type: PsyanimJsPsychPlugin,
    sceneKey: MyArriveScene.key,
};

let arriveAgentPrefabSceneTrial = {
    type: PsyanimJsPsychPlugin,
    sceneKey: MyArriveAgentPrefabScene.key
};

let goodbye = {
    type: htmlKeyboardResponse,
    stimulus: 'Congrats - you have completed your first experiment!  Press any key to end this trial.'
};

jsPsych.run([welcome, 
    myFirstSceneTrial, interactiveEvadeAgentTrial, 
    arriveSceneTrial, arriveAgentPrefabSceneTrial, 
    goodbye]);
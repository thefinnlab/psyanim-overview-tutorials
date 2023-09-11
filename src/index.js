import { initJsPsych } from 'jspsych';

import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

import { 
    PsyanimApp, 
    PsyanimJsPsychPlugin,
    PsyanimFirebaseClient,
    PsyanimUtils

} from 'psyanim2';

// import firebaseJsonConfig from '../firebase.config.json';

import MyFirstScene from './MyFirstScene';
import InteractiveEvadeAgent from './InteractiveEvadeAgent';
import MyArriveScene from './MyArriveScene';
import MyArriveAgentPrefabScene from './MyArriveAgentPrefabScene';
import JsPsychIntegrationScene from './JsPsychIntegrationScene';

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

let timeline = [];

// 'welcome' trial
timeline.push({
    type: htmlKeyboardResponse,
    stimulus: 'Welcome to the experiment.  Press any key to begin.'
});

// MyFirstScene trial
timeline.push({
    type: PsyanimJsPsychPlugin,
    sceneKey: MyFirstScene.key,
});

// InteractiveEvadeAgent trial
timeline.push({
    type: PsyanimJsPsychPlugin,
    sceneKey: InteractiveEvadeAgent.key,
    endTrialOnContact: true
});

// MyArriveScene trial
timeline.push({
    type: PsyanimJsPsychPlugin,
    sceneKey: MyArriveScene.key,
});

// MyArriveAgentPrefabScene trial
timeline.push({
    type: PsyanimJsPsychPlugin,
    sceneKey: MyArriveAgentPrefabScene.key
});

// JsPsychIntegrationScene trials - here we add multiple trials as variations of the same scene
let nTrials = 3;

let trialDurations = [ 5000, 10000, 15000 ];
let trialInstances = [3, 6, 20];
let trialAgentColors = [ 0x32CD32, 0xBC13FE, 0xFFC0CB ];

let trialParams = [
    {
        radius: 150,
        maxSpeed: 3,
        maxAcceleration: 0.03,
        maxAngleChangePerFrame: 10
    },
    {
        radius: 150,
        maxSpeed: 3,
        maxAcceleration: 0.03,
        maxAngleChangePerFrame: 10
    },
    {
        radius: 50,
        maxSpeed: 3,
        maxAcceleration: 0.2,
        maxAngleChangePerFrame: 20
    }
];

for (let i = 0; i < nTrials; ++i)
{
    // clone the original JsPsychIntegrationScene so we can vary its params w/o modifying the original
    let trialScene = PsyanimUtils.cloneSceneDefinition(JsPsychIntegrationScene);

    // modify the scene key to be something unique and register the scene
    trialScene.key += '_' + i;

    PsyanimApp.Instance.config.registerScene(trialScene);

    // modify any trial parameters we want to change
    trialScene.entities[0].instances = trialInstances[i];
    trialScene.entities[0].shapeParams.color = trialAgentColors[i];
    trialScene.entities[0].prefab.params = trialParams[i];

    // add it to the jsPsych timeline!
    timeline.push({
        type: PsyanimJsPsychPlugin,
        sceneKey: trialScene.key,
        duration: trialDurations[i],
        endTrialKeys: [' ', 'enter', 'h']
    });
}

// 'End' trial
timeline.push({
    type: htmlKeyboardResponse,
    stimulus: 'Congrats - you have completed your first experiment!  Press any key to end this trial.'
});

jsPsych.run(timeline);
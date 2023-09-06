import 
{ 
    PsyanimConstants,
    PsyanimPlayerController,
    PsyanimEvadeAgentPrefab,
    PsyanimEvadeAgent
    
} from 'psyanim2';

export default {
    key: 'InteractiveEvadeAgent',
    entities: [
        {
            name: 'player',
            initialPosition: { x: 400, y: 300 },
            shapeParams: {
                shapeType: PsyanimConstants.SHAPE_TYPE.CIRCLE,
                radius: 12,
                color: 0x0000ff
            },
            components: [
                { type: PsyanimPlayerController }
            ]
        },
        {
            name: 'agent1',
            initialPosition: { x: 600, y: 450 },
            shapeParams: {
                shapeType: PsyanimConstants.SHAPE_TYPE.TRIANGLE, 
                base: 16, altitude: 32, color: 0x00ff00         
            },
            prefab: { type: PsyanimEvadeAgentPrefab },
            components: [
                {
                    type: PsyanimEvadeAgent,
                    params: {
                        target: {
                            entityName: 'player'
                        }
                    }
                }
            ]
        }
    ]
};
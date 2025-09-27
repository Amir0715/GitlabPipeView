import { waitElementFinishLoading, determineWindowPropertyIsLoaded } from '../common/utils/monitoringElement';

export async function beforeMountEvent() {
    console.log("start beforeMountEvent");
    const init = await Promise.race([determineWindowPropertyIsLoaded('$'), waitElementFinishLoading({ tagName: 'body' })]);

    console.log(init);
    if (!init) {
        console.warn('init is null. returning', init);
        return;
    }
}

export async function afterMountEvent() {
    
}

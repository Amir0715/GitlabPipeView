import { createSvelte } from './svelte';

import { beforeMountEvent, afterMountEvent } from './lifecycle/mountEvent';
import { createDivAppElement, getMultiDivAppElement } from './common/utils/elementAdvanced';

createDivAppElement('svelte');
const [svelte] = getMultiDivAppElement(['svelte']);

beforeMountEvent();

createSvelte(svelte);

afterMountEvent();

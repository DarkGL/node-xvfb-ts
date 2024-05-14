import { Xvfb } from '../dist/index.js';

async function test() {
    const xvfb = new Xvfb({ displayNum: 88 });

    await xvfb.start();

    console.log('started sync');

    await xvfb.stop();

    console.error('stopped sync');

    await xvfb.start();

    console.log('started sync');

    await xvfb.stop();

    console.error('stopped sync');
}

test();

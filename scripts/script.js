// Imports
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Reactive = require('Reactive');
const Animation = require('Animation');
const Materials = require('Materials');
const Gestures = require('TouchGestures');
const Time = require('Time');

// Set initial values for Script's outputs
Patches.inputs.setScalar('affLevel', 5);
Patches.inputs.setScalar('gwLevel', 1);

const iceCap_2 = Scene.root.find('IceCap_level2');
const iceCap_3 = Scene.root.find('IceCap_level3');
const iceCap_4 = Scene.root.find('IceCap_level4');
const iceCap_5 = Scene.root.find('IceCap_level5');

const lake = Scene.root.find('Lake');
lake.transform.y = -0.2;

const greenPlatformMat = Materials.get('platform');
let presentR = 51 / 255, presentG = 250 / 255, presentB = 28 / 255;
greenPlatformMat.baseColorFactor = Reactive.RGBA(presentR, presentG, presentB, 1);


// Initialize all levels of trees
const treeLev_2 = Scene.root.find('Trees_level2');
treeLev_2.transform.y = -0.177;

const treeLev_3 = Scene.root.find('Trees_level3');
treeLev_3.transform.y = -0.177;

const treeLev_4 = Scene.root.find('Trees_level4');
treeLev_4.transform.y = -0.177;

const treeLev_5 = Scene.root.find('Trees_level5');
treeLev_5.transform.y = -0.177;


// Initialize Ozone animation values [START]

// const ozoneMat = Materials.get('ozoneMat');
// ozoneMat.opacity = 0.8;

// With respect to Afforestation Levels
const ozoneLevelColors = {
    1: { r: 0, g: 82, b: 255 },
    2: { r: 0, g: 208, b: 255 },
    3: { r: 255, g: 136, b: 0 },
    4: { r: 242, g: 255, b: 0 },
    5: { r: 18, g: 186, b: 0 }
};
// let presentOzoneR = ozoneLevelColors[5].r/255, presentOzoneG = ozoneLevelColors[5].g/255, presentOzoneB = ozoneLevelColors[5].b/255;
// ozoneMat.baseColorFactor = Reactive.RGBA(presentOzoneR, presentOzoneG, presentOzoneB, 1);

const ozoneMat1 = Materials.get('ozoneMat1');
let presentOzoneR1 = ozoneLevelColors[5].r / 255, presentOzoneG1 = ozoneLevelColors[5].g / 255, presentOzoneB1 = ozoneLevelColors[5].b / 255;
ozoneMat1.baseColorFactor = Reactive.RGBA(presentOzoneR1, presentOzoneG1, presentOzoneB1, 1);

const ozoneMat2 = Materials.get('ozoneMat2');
let presentOzoneR2 = ozoneLevelColors[5].r / 255, presentOzoneG2 = ozoneLevelColors[5].g / 255, presentOzoneB2 = ozoneLevelColors[5].b / 255;
ozoneMat2.baseColorFactor = Reactive.RGBA(presentOzoneR2, presentOzoneG2, presentOzoneB1, 1);

const ozoneMat3 = Materials.get('ozoneMat3');
let presentOzoneR3 = ozoneLevelColors[5].r / 255, presentOzoneG3 = ozoneLevelColors[5].g / 255, presentOzoneB3 = ozoneLevelColors[5].b / 255;
ozoneMat3.baseColorFactor = Reactive.RGBA(presentOzoneR3, presentOzoneG3, presentOzoneB3, 1);

const ozoneMat4 = Materials.get('ozoneMat4');
let presentOzoneR4 = ozoneLevelColors[5].r / 255, presentOzoneG4 = ozoneLevelColors[5].g / 255, presentOzoneB4 = ozoneLevelColors[5].b / 255;
ozoneMat4.baseColorFactor = Reactive.RGBA(presentOzoneR4, presentOzoneG4, presentOzoneB4, 1);

const ozoneMat5 = Materials.get('ozoneMat5');
let presentOzoneR5 = ozoneLevelColors[5].r / 255, presentOzoneG5 = ozoneLevelColors[5].g / 255, presentOzoneB5 = ozoneLevelColors[5].b / 255;
ozoneMat5.baseColorFactor = Reactive.RGBA(presentOzoneR5, presentOzoneG5, presentOzoneB5, 1);

// Initialize Ozone animation values [END]


const placer = Scene.root.find('placer');
const shadow = Scene.root.find('Dropshadow');
const canvas = Scene.root.find('canvas');
const banner = Scene.root.find('startBanner');
Patches.inputs.setBoolean('filterStarted', false);
let filterStarted = false;

Gestures.onTap().subscribe(async e => {
    if ((await Patches.outputs.getBoolean('backCameraActive')).pinLastValue() && !filterStarted) {
        filterStarted = true;
        let bannerClosed = false;

        const animDriv = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
        animDriv.start();

        const animSamp = Animation.samplers.easeInOutElastic(0, 0.2);
        const anim = Animation.animate(animDriv, animSamp);
        placer.transform.scaleX = anim;
        placer.transform.scaleY = anim;
        placer.transform.scaleZ = anim;

        const animSampShadow = Animation.samplers.easeInOutElastic(0, 4);
        const animShadow = Animation.animate(animDriv, animSampShadow);
        shadow.transform.scaleX = animShadow;
        shadow.transform.scaleY = animShadow;
        shadow.transform.scaleZ = animShadow;

        canvas.hidden = false;
        Patches.inputs.setBoolean('filterStarted', true);

        const animDrivBanner = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
        animDrivBanner.start();
        const animSampBannerX = Animation.samplers.easeInOutElastic(0, 0.6);
        const animBannerX = Animation.animate(animDrivBanner, animSampBannerX);
        const animSampBannerY = Animation.samplers.easeInOutElastic(0, 0.2);
        const animBannerY = Animation.animate(animDrivBanner, animSampBannerY);
        banner.transform.scaleX = animBannerX;
        banner.transform.scaleY = animBannerY;

        Time.setTimeout(() => {
            if (!bannerClosed)
                animDrivBanner.reverse();
        }, 5000);

        Gestures.onTap(banner).subscribe(e => {
            bannerClosed = true;
            animDrivBanner.reverse();
        });
    }
});

const overlay = Scene.root.find('overlay');
overlay.hidden = true;
const overlayMat = Materials.get('overlay');
Gestures.onTap(overlay).subscribe(e => {
    Patches.inputs.setPulse('overlayTapped', Reactive.once());

    const animDriv = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
    animDriv.start();

    const animSamp = Animation.samplers.easeInOutQuint(0.4, 0);
    const anim = Animation.animate(animDriv, animSamp);
    overlayMat.opacity = anim;

    animDriv.onCompleted().subscribe(() => overlay.hidden = true);
});


Patches.outputs.getPulse('factObjectTapped').then(pulse => {
    pulse.subscribe(e => {
        overlay.hidden = false;

        const animDriv = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
        animDriv.start();

        const animSamp = Animation.samplers.easeInOutQuint(0, 0.4);
        const anim = Animation.animate(animDriv, animSamp);
        overlayMat.opacity = anim;
    });
});


/**
 * @param {number} level
 */
const animateOzoneLayers = (level) => {
    const animDrivOzoneMat4 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
    animDrivOzoneMat4.start();
    const animSampOzoneMatR4 = Animation.samplers.easeInOutQuint(presentOzoneR4, ozoneLevelColors[level < 5 ? 1 : level].r / 255);
    const animOzoneR4 = Animation.animate(animDrivOzoneMat4, animSampOzoneMatR4);
    presentOzoneR4 = ozoneLevelColors[level < 5 ? 1 : level].r / 255;

    const animSampOzoneMatG4 = Animation.samplers.easeInOutQuint(presentOzoneG4, ozoneLevelColors[level < 5 ? 1 : level].g / 255);
    const animOzoneG4 = Animation.animate(animDrivOzoneMat4, animSampOzoneMatG4);
    presentOzoneG4 = ozoneLevelColors[level < 5 ? 1 : level].g / 255;

    const animSampOzoneMatB4 = Animation.samplers.easeInOutQuint(presentOzoneB4, ozoneLevelColors[level < 5 ? 1 : level].b / 255);
    const animOzoneB4 = Animation.animate(animDrivOzoneMat4, animSampOzoneMatB4);
    presentOzoneB4 = ozoneLevelColors[level < 5 ? 1 : level].b / 255;

    ozoneMat4.baseColorFactor = Reactive.RGBA(animOzoneR4, animOzoneG4, animOzoneB4, 1);


    const animDrivOzoneMat3 = Animation.timeDriver({ durationMilliseconds: 1500, loopCount: 1, mirror: true });
    animDrivOzoneMat3.start();
    const animSampOzoneMatR3 = Animation.samplers.easeInOutQuint(presentOzoneR3, ozoneLevelColors[level < 4 ? 1 : level == 4 ? 2 : 5].r / 255);
    const animOzoneR3 = Animation.animate(animDrivOzoneMat3, animSampOzoneMatR3);
    presentOzoneR3 = ozoneLevelColors[level < 4 ? 1 : level == 4 ? 2 : 5].r / 255;

    const animSampOzoneMatG3 = Animation.samplers.easeInOutQuint(presentOzoneG3, ozoneLevelColors[level < 4 ? 1 : level == 4 ? 2 : 5].g / 255);
    const animOzoneG3 = Animation.animate(animDrivOzoneMat3, animSampOzoneMatG3);
    presentOzoneG3 = ozoneLevelColors[level < 4 ? 1 : level == 4 ? 2 : 5].g / 255;

    const animSampOzoneMatB3 = Animation.samplers.easeInOutQuint(presentOzoneB3, ozoneLevelColors[level < 4 ? 1 : level == 4 ? 2 : 5].b / 255);
    const animOzoneB3 = Animation.animate(animDrivOzoneMat3, animSampOzoneMatB3);
    presentOzoneB3 = ozoneLevelColors[level < 4 ? 1 : level == 4 ? 2 : 5].b / 255;

    ozoneMat3.baseColorFactor = Reactive.RGBA(animOzoneR3, animOzoneG3, animOzoneB3, 1);


    const animDrivOzoneMat2 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
    animDrivOzoneMat2.start();
    const animSampOzoneMatR2 = Animation.samplers.easeInOutQuint(presentOzoneR2, ozoneLevelColors[level < 3 ? 1 : level == 3 ? 2 : level == 4 ? 3 : 5].r / 255);
    const animOzoneR2 = Animation.animate(animDrivOzoneMat2, animSampOzoneMatR2);
    presentOzoneR2 = ozoneLevelColors[level < 3 ? 1 : level == 3 ? 2 : level == 4 ? 3 : 5].r / 255;

    const animSampOzoneMatG2 = Animation.samplers.easeInOutQuint(presentOzoneG2, ozoneLevelColors[level < 3 ? 1 : level == 3 ? 2 : level == 4 ? 3 : 5].g / 255);
    const animOzoneG2 = Animation.animate(animDrivOzoneMat2, animSampOzoneMatG2);
    presentOzoneG2 = ozoneLevelColors[level < 3 ? 1 : level == 3 ? 2 : level == 4 ? 3 : 5].g / 255;

    const animSampOzoneMatB2 = Animation.samplers.easeInOutQuint(presentOzoneB2, ozoneLevelColors[level < 3 ? 1 : level == 3 ? 2 : level == 4 ? 3 : 5].b / 255);
    const animOzoneB2 = Animation.animate(animDrivOzoneMat2, animSampOzoneMatB2);
    presentOzoneB2 = ozoneLevelColors[level < 3 ? 1 : level == 3 ? 2 : level == 4 ? 3 : 5].b / 255;

    ozoneMat2.baseColorFactor = Reactive.RGBA(animOzoneR2, animOzoneG2, animOzoneB2, 1);


    const animDrivOzoneMat1 = Animation.timeDriver({ durationMilliseconds: 2500, loopCount: 1, mirror: true });
    animDrivOzoneMat1.start();
    const animSampOzoneMatR1 = Animation.samplers.easeInOutQuint(presentOzoneR1, ozoneLevelColors[level < 2 ? 1 : level].r / 255);
    const animOzoneR1 = Animation.animate(animDrivOzoneMat1, animSampOzoneMatR1);
    presentOzoneR1 = ozoneLevelColors[level < 2 ? 1 : level].r / 255;

    const animSampOzoneMatG1 = Animation.samplers.easeInOutQuint(presentOzoneG1, ozoneLevelColors[level < 2 ? 1 : level].g / 255);
    const animOzoneG1 = Animation.animate(animDrivOzoneMat1, animSampOzoneMatG1);
    presentOzoneG1 = ozoneLevelColors[level < 2 ? 1 : level].g / 255;

    const animSampOzoneMatB1 = Animation.samplers.easeInOutQuint(presentOzoneB1, ozoneLevelColors[level < 2 ? 1 : level].b / 255);
    const animOzoneB1 = Animation.animate(animDrivOzoneMat1, animSampOzoneMatB1);
    presentOzoneB1 = ozoneLevelColors[level < 2 ? 1 : level].b / 255;

    ozoneMat1.baseColorFactor = Reactive.RGBA(animOzoneR1, animOzoneG1, animOzoneB1, 1);
}


// Afforestation Levels [START]

const a1 = Scene.root.find('A_1');
Patches.outputs.getPulse('a1Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('affLevel', 1);
            Patches.inputs.setScalar('gwLevel', 5);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]

            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.1);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[1].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[1].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[1].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[1].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[1].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[1].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(1);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.52);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.52);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.52);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.35);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 79 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 79 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 54 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 54 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 26 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 26 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, -0.5);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, -0.5);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, -0.5);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const a2 = Scene.root.find('A_2');
Patches.outputs.getPulse('a2Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('affLevel', 2);
            Patches.inputs.setScalar('gwLevel', 4);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.32);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[2].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[2].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[2].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[2].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[2].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[2].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(2);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.52);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.52);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.3);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 119 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 119 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 133 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 133 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 15 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 15 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, -0.5);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, -0.5);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const a3 = Scene.root.find('A_3');
Patches.outputs.getPulse('a3Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('affLevel', 3);
            Patches.inputs.setScalar('gwLevel', 3);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 1000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.48);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[3].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[3].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[3].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[3].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[3].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[3].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(3);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.177);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.52);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.27);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 155 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 155 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 186 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 186 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 28 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 28 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, 0);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, -0.5);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const a4 = Scene.root.find('A_4');
Patches.outputs.getPulse('a4Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('affLevel', 4);
            Patches.inputs.setScalar('gwLevel', 2);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 1000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.64);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[4].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[4].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[4].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[4].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[4].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[4].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(4);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.177);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.177);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.24);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 130 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 130 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 209 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 209 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 19 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 19 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, 0);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, 0);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const a5 = Scene.root.find('A_5');
Patches.outputs.getPulse('a5Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('affLevel', 5);
            Patches.inputs.setScalar('gwLevel', 1);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 1000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.8);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[5].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[5].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[5].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[5].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[5].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[5].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(5);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.177);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.177);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.177);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.2);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 51 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 51 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 250 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 250 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 28 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 28 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, 0);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, 0);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, 0);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

// Afforstation Level [END]


// Global Warming Level [START]

const gw1 = Scene.root.find('GW_1');
Patches.outputs.getPulse('g1Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('gwLevel', 1);
            Patches.inputs.setScalar('affLevel', 5);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 1000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.8);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[5].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[5].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[5].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[5].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[5].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[5].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(5);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.177);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.177);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.177);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.2);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 51 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 51 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 250 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 250 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 28 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 28 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, 0);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, 0);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, 0);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const gw2 = Scene.root.find('GW_2');
Patches.outputs.getPulse('g2Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('gwLevel', 2);
            Patches.inputs.setScalar('affLevel', 4);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 1000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.64);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[4].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[4].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[4].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[4].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[4].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[4].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(4);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.177);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.177);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.24);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 130 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 130 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 209 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 209 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 19 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 19 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, 0);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, 0);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const gw3 = Scene.root.find('GW_3');
Patches.outputs.getPulse('g3Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('gwLevel', 3);
            Patches.inputs.setScalar('affLevel', 3);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 1000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.48);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[3].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[3].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[3].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[3].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[3].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[3].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(3);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.177);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.52);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.27);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 155 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 155 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 186 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 186 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 28 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 28 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, 0);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, -0.5);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const gw4 = Scene.root.find('GW_4');
Patches.outputs.getPulse('g4Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('gwLevel', 4);
            Patches.inputs.setScalar('affLevel', 2);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.32);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[2].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[2].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[2].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[2].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[2].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[2].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(2);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.177);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.52);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.52);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.3);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 119 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 119 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 133 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 133 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 15 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 15 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, 0);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, -0.5);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, -0.5);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

const gw5 = Scene.root.find('GW_5');
Patches.outputs.getPulse('g5Tap')
    .then(e => {
        e.subscribe(tapPulse => {
            Patches.inputs.setScalar('gwLevel', 5);
            Patches.inputs.setScalar('affLevel', 1);

            Patches.inputs.setPulse('levelTapped', Reactive.once());

            // Ozone animation [START]
            // const animDrivOzone = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzone.start();
            // const animSampOzone = Animation.samplers.easeInOutQuint(ozoneMat.opacity.lastValue, 0.1);
            // const animOzone = Animation.animate(animDrivOzone, animSampOzone);
            // ozoneMat.opacity = animOzone;

            // const animDrivOzoneMat = Animation.timeDriver({durationMilliseconds: 2000, loopCount: 1, mirror: true});
            // animDrivOzoneMat.start();

            // const animSampOzoneMatR = Animation.samplers.easeInOutQuint(presentOzoneR, ozoneLevelColors[1].r/255);
            // const animOzoneR = Animation.animate(animDrivOzoneMat, animSampOzoneMatR);
            // presentOzoneR = ozoneLevelColors[1].r/255;

            // const animSampOzoneMatG = Animation.samplers.easeInOutQuint(presentOzoneG, ozoneLevelColors[1].g/255);
            // const animOzoneG = Animation.animate(animDrivOzoneMat, animSampOzoneMatG);
            // presentOzoneG = ozoneLevelColors[1].g/255;

            // const animSampOzoneMatB = Animation.samplers.easeInOutQuint(presentOzoneB, ozoneLevelColors[1].b/255);
            // const animOzoneB = Animation.animate(animDrivOzoneMat, animSampOzoneMatB);
            // presentOzoneB = ozoneLevelColors[1].b/255;

            // ozoneMat.baseColorFactor = Reactive.RGBA(animOzoneR, animOzoneG, animOzoneB, 1);

            animateOzoneLayers(1);
            // Ozone animation [END]

            // Trees' animation [START]
            const animDrivLev_2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLev_2.start();
            const animSampLev_2 = Animation.samplers.easeInOutQuint(treeLev_2.transform.y.lastValue, -0.52);
            const animLev_2 = Animation.animate(animDrivLev_2, animSampLev_2);
            treeLev_2.transform.y = animLev_2;

            const animDrivLev_3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivLev_3.start();
            const animSampLev_3 = Animation.samplers.easeInOutQuint(treeLev_3.transform.y.lastValue, -0.52);
            const animLev_3 = Animation.animate(animDrivLev_3, animSampLev_3);
            treeLev_3.transform.y = animLev_3;

            const animDrivLev_4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDrivLev_4.start();
            const animSampLev_4 = Animation.samplers.easeInOutQuint(treeLev_4.transform.y.lastValue, -0.52);
            const animLev_4 = Animation.animate(animDrivLev_4, animSampLev_4);
            treeLev_4.transform.y = animLev_4;

            const animDrivLev_5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDrivLev_5.start();
            const animSampLev_5 = Animation.samplers.easeInOutQuint(treeLev_5.transform.y.lastValue, -0.52);
            const animLev_5 = Animation.animate(animDrivLev_5, animSampLev_5);
            treeLev_5.transform.y = animLev_5;
            // Trees' animation [END]

            const animDrivLake = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDrivLake.start();
            const animSampLake = Animation.samplers.easeInOutQuint(lake.transform.y.lastValue, -0.35);
            const animLake = Animation.animate(animDrivLake, animSampLake);
            lake.transform.y = animLake;

            // Platform Color animate [START]
            const animDrivMat = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDrivMat.start();

            const animSampMatR = Animation.samplers.easeInOutQuint(presentR, 79 / 255);
            const animR = Animation.animate(animDrivMat, animSampMatR);
            presentR = 79 / 255;

            const animSampMatG = Animation.samplers.easeInOutQuint(presentG, 54 / 255);
            const animG = Animation.animate(animDrivMat, animSampMatG);
            presentG = 54 / 255;

            const animSampMatB = Animation.samplers.easeInOutQuint(presentB, 26 / 255);
            const animB = Animation.animate(animDrivMat, animSampMatB);
            presentB = 26 / 255;

            greenPlatformMat.baseColorFactor = Reactive.RGBA(animR, animG, animB, 1);
            // Platform Color animate [END]

            const animDriv5 = Animation.timeDriver({ durationMilliseconds: 4000, loopCount: 1, mirror: true });
            animDriv5.start();
            const animSamp5 = Animation.samplers.easeInOutQuint(iceCap_5.transform.y.lastValue, -0.5);
            const anim5 = Animation.animate(animDriv5, animSamp5);
            iceCap_5.transform.y = anim5;

            const animDriv4 = Animation.timeDriver({ durationMilliseconds: 3000, loopCount: 1, mirror: true });
            animDriv4.start();
            const animSamp4 = Animation.samplers.easeInOutQuint(iceCap_4.transform.y.lastValue, -0.5);
            const anim4 = Animation.animate(animDriv4, animSamp4);
            iceCap_4.transform.y = anim4;

            const animDriv3 = Animation.timeDriver({ durationMilliseconds: 2000, loopCount: 1, mirror: true });
            animDriv3.start();
            const animSamp3 = Animation.samplers.easeInOutQuint(iceCap_3.transform.y.lastValue, -0.5);
            const anim3 = Animation.animate(animDriv3, animSamp3);
            iceCap_3.transform.y = anim3;

            const animDriv2 = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: true });
            animDriv2.start();
            const animSamp2 = Animation.samplers.easeInOutQuint(iceCap_2.transform.y.lastValue, -0.5);
            const anim2 = Animation.animate(animDriv2, animSamp2);
            iceCap_2.transform.y = anim2;
        })
    });

// Global Warming Level [END]
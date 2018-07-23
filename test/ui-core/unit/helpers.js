import { jsdom } from 'jsdom';
import Chance from 'chance';
import proxyQuire from 'proxyquire';
import sinonChai from 'sinon-chai';
import chai, {expect as chaiExpect} from 'chai';

proxyQuire.noCallThru();
chai.use(sinonChai);

const chance = new Chance();
const doc = jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

proxyQuire.noCallThru();

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

export function restore(sandbox) {
    return function () {
        sandbox.restore();
    };
}

export function runInWindow(window, method) {
    global.window = window;
    global.document = window.document;
    window.methodToRun = method;
    window.eval('result=methodToRun()');
    return window.result;
}

export function givenProduct(options) {
    return {
        title: chance.string(),
        purchasingChannelCode: chance.integer(),
        shortDescription: chance.string(),
        ItemDescription: chance.string(),
        itemId: chance.guid(),
        Offers: chance.bool(),
        ReturnPolicy: [],
        Promotions: [],
        CustomerReview: {},
        Images: [],
        ...options
    };
}


export function loadConnectedComponent(filename, sandbox, extraProxies) {
    const connectedComponent = Symbol('connected component');
    const connectStubReturn = sandbox.stub().returns(connectedComponent);
    const connectStub = sandbox.stub().returns(connectStubReturn);

    const defaultExport = proxyQuire(`../../../src/${filename}`, {
        'react-redux': {
            connect: connectStub,
            '@noCallThru': true
        },
        ...extraProxies
    });

    const [mapStateToProps, mapDispatchToProps, mergeProps] = connectStub.getCall(0).args;

    return {
        mapStateToProps,
        mapDispatchToProps,
        mergeProps,
        connectStubReturn,
        connectedComponent,
        defaultExport
    };
}

import React from 'react';
import {expect} from 'chai';
import jsdom from 'jsdom';
import CounterInput from '../../../../../src/ui-core/components/product-overview/product-counter-input';
import Chance from 'chance';
import sinon from 'sinon';
import {runInWindow} from '../../helpers';

const chance = new Chance;

import {shallow, mount} from 'enzyme';

const sandbox = sinon.sandbox.create();

function givenProps(value, min, max, onChange, glyphPlus, glyphMinus) {
    return {
        value,
        min,
        max,
        onChange,
        glyphPlus,
        glyphMinus
    }
}

function mountCounterInputComponent(expectedProps) {
    return runInWindow(window, () => {
        return mount(<CounterInput
            {...expectedProps}
        />);
    });
}

describe('Feature: Product Counter Input Component', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('should render a div', () => {
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max);

        const productCounterSection = shallow(<CounterInput {...props} />);

        expect(productCounterSection.type()).to.equal('div');

        expect(productCounterSection.props().children[0].type).to.equal('span');
        expect(productCounterSection.props().children[0].props.className).to.equal('quantity-placeholder');
        expect(productCounterSection.props().children[0].props.children).to.deep.equal('Quantity ');
    });

    it('should render pass props to set initial set instead of fallback to default', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = -1;
        const min = 0;
        const max = -1;
        const glyphPlus = "right";
        const glyphMinus = "left";
        const props = givenProps(value, min, max, () => {
        }, glyphPlus, glyphMinus);

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode = productCounterSection.props().children[1];
        const Inode = glyphPlusNode.props.children;
        const inputNode = productCounterSection.props().children[2];
        const glyphPlusNode1 = productCounterSection.props().children[3];

        expect(glyphPlusNode.type).to.equal('div');
        expect(glyphPlusNode.props.className).to.equal('input-group-addon w-75 add-on-plus');
        expect(glyphPlusNode.props.style).to.deep.equal(expectedStyles);
        expect(glyphPlusNode.props.onClick).to.be.an('function');
        expect(Inode.type).to.equal('i');

        expect(inputNode.type).to.equal('input');
        expect(inputNode.props.className).to.equal('text-center');
        expect(inputNode.props.type).to.equal('text');
        expect(inputNode.props.value).to.equal(0);
        expect(inputNode.props.onChange).to.be.an('function');

        expect(glyphPlusNode1.type).to.equal('span');
        expect(glyphPlusNode1.props.className).to.equal('input-group-addon w-75 add-on-minus');
        expect(glyphPlusNode1.props.style).to.deep.equal(expectedStyles);
        expect(glyphPlusNode1.props.onClick).to.be.an('function');
    });

    it('should render a glyhplus left', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max);

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode = productCounterSection.props().children[1];
        const Inode = glyphPlusNode.props.children;
        const inputNode = productCounterSection.props().children[2];
        const glyphPlusNode1 = productCounterSection.props().children[3];

        expect(glyphPlusNode.type).to.equal('div');
        expect(glyphPlusNode.props.className).to.equal('input-group-addon w-75 add-on-plus');
        expect(glyphPlusNode.props.style).to.deep.equal(expectedStyles);
        expect(glyphPlusNode.props.onClick).to.be.an('function');
        expect(Inode.type).to.equal('i');
        expect(Inode.props.className).to.equal('fa fa-minus');

        expect(inputNode.type).to.equal('input');
        expect(inputNode.props.className).to.equal('text-center');
        expect(inputNode.props.type).to.equal('text');
        expect(inputNode.props.value).to.equal(value);
        expect(inputNode.props.onChange).to.be.an('function');

        expect(glyphPlusNode1.type).to.equal('span');
        expect(glyphPlusNode1.props.className).to.equal('input-group-addon w-75 add-on-minus');
        expect(glyphPlusNode1.props.style).to.deep.equal(expectedStyles);
        expect(glyphPlusNode1.props.onClick).to.be.an('function');
    });

    it('should render a glyph minus right', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max);

        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "right",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode = productCounterSection.props().children[1];
        const Inode = glyphPlusNode.props.children;
        const inputNode = productCounterSection.props().children[2];
        const glyphPlusNode1 = productCounterSection.props().children[3];

        expect(glyphPlusNode.type).to.equal('div');
        expect(glyphPlusNode.props.className).to.equal('input-group-addon w-75 add-on-plus');
        expect(glyphPlusNode.props.style).to.deep.equal(expectedStyles);
        expect(glyphPlusNode.props.onClick).to.be.an('function');
        expect(Inode.type).to.equal('i');
        expect(Inode.props.className).to.equal('fa fa-minus');

        expect(inputNode.type).to.equal('input');
        expect(inputNode.props.className).to.equal('text-center');
        expect(inputNode.props.type).to.equal('text');
        expect(inputNode.props.value).to.equal(value);
        expect(inputNode.props.onChange).to.be.an('function');

        expect(glyphPlusNode1.type).to.equal('span');
        expect(glyphPlusNode1.props.className).to.equal('input-group-addon w-75 add-on-minus');
        expect(glyphPlusNode1.props.style).to.deep.equal(expectedStyles);
        expect(glyphPlusNode1.props.onClick).to.be.an('function');
    });

    it('should set value to 0 if min value is not present', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = 0;
        const max = 1;
        const min = -2;
        const props = givenProps(value, min, max, () => {
        });

        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            max: 10,
            glyphPlus: "right",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
    });

    it('should set value min if value < min', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = 0;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        });

        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 0,
            min: 1,
            max: 10,
            glyphPlus: "right",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should decrement value on minus click when value NaN', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = '';
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        });

        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: '',
            min: 1,
            max: 10,
            glyphPlus: "right",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should decrement value on minus click when value if parsed is NaN', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = chance.string();
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        });

        const productCounterSection = shallow(<CounterInput {...props} />);

        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: chance.string(),
            min: 1,
            max: 10,
            glyphPlus: "right",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should decrement value on minus click when value is present', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max);

        const productCounterSection = shallow(<CounterInput {...props} />);
        const propsWithValue = {
            min: 3,
            max: 7,
            value: 4
        };
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 3,
            min: 1,
            max: 10,
            glyphPlus: "right",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick(4);

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should decrement value on minus click when value < max value', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const propsWithValue = {
            min: 3,
            max: 7,
            value: 4,
            onChange: () => {
            }
        };

        const productCounterSection = shallow(<CounterInput {...propsWithValue} />);
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            min: 2,
            max: 7,
            value: 4,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].max).to.equal(expectedNextProps.max);
    });

    it('should increment value on glyphplus click when value NaN', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        const value = '';
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        });

        const productCounterSection = shallow(<CounterInput {...props} />);
        //when
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: '',
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should increment value on glyphplus click when parsed is NaN', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        }, {position: 'left'});

        const productCounterSection = shallow(<CounterInput {...props} />);

        //when
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: chance.string(),
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should increment value on plus click when value is present', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        }, {position: 'left'});

        const productCounterSection = shallow(<CounterInput {...props} />);
        const propsWithValue = {
            min: 3,
            max: 7,
            value: 4
        };
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 3,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick(4);

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should increment value on plus click when value > max value', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const propsWithValue = {
            min: 3,
            max: 7,
            value: 4,
            onChange: () => {
            },
            glyphPlus: {position: "left"}
        };

        const productCounterSection = shallow(<CounterInput {...propsWithValue} />);
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            min: 2,
            max: 7,
            value: 4,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(expectedNextProps.min);
    });

    it('should increment value on plus click when max value is -1', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const propsWithValue = {
            min: 3,
            max: -1,
            value: 4,
            onChange: () => {
            }
        };

        const productCounterSection = shallow(<CounterInput {...propsWithValue} />);
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            min: 2,
            max: -1,
            value: 4,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // when
        const glyphMinusNode = productCounterSection.props().children[1];

        glyphMinusNode.props.onClick();

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(expectedNextProps.min);
    });

    it('should render a glyphplus click when value NaN', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        }, {position: 'left'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];

        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should render a glyphplus click when when value is present', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        }, {position: 'left'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];

        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should increment value on plus click when value > max value', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const propsWithValue = {
            min: 3,
            max: 7,
            value: 4,
            onChange: () => {
            },
            glyphPlus: {position: "left"}
        };

        const productCounterSection = shallow(<CounterInput {...propsWithValue} />);
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            min: 2,
            max: 7,
            value: 4,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];

        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(2);
    });

    it('should render a glyphminus click when value NaN', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        }, {position: 'right'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];

        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should render a glyphminus click when when value is present', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max, () => {
        }, {position: 'right'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];

        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(1);
    });

    it('should increment value on plus click when value > max value', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        //when
        const propsWithValue = {
            min: 3,
            max: 7,
            value: 4,
            onChange: () => {
            },
            glyphPlus: {position: "right"}
        };

        const productCounterSection = shallow(<CounterInput {...propsWithValue} />);
        let instance = mountCounterInputComponent(propsWithValue).instance();
        sandbox.spy(instance, 'setState');
        const expectedStyles = {
            "cursor": "pointer"
        };
        const expectedNextProps = {
            min: 2,
            max: 7,
            value: 4,
            glyphPlus: "left",
            styles: expectedStyles
        };
        instance.componentWillReceiveProps(expectedNextProps);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];

        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].min).to.equal(2);
    });

    it('should set props reference in state', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max);

        //when
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        const expectedNextProps = {
            value: 2,
            min: 1,
            max: 10
        };
        instance.componentWillReceiveProps(expectedNextProps);

        //then
        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState).to.have.calledWith({
            ...expectedNextProps
        });
    });

    it('should should not set state when props does not change', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;

        const value = 1;
        const min = 1;
        const max = 1;
        const props = givenProps(value, min, max);

        //when
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        instance.componentWillReceiveProps(props);

        //then
        expect(instance.setState).to.have.callCount(0);
    });

    it('should trigger onChange function when target is changed', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const value = 5;
        const min = 4;
        const max = 3;
        let targetValue = {
            target: {
                value
            }
        };
        const props = givenProps(value, min, max, () => {
        }, {position: 'right'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        instance.set(value);

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];
        const inputNode = productCounterSection.props().children[2];

        inputNode.props.onChange(targetValue);
        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].value).to.deep.equal(5);
    });

    it('should trigger onChange function when target is changed when newValue', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const min = 4;
        const max = 3;
        let targetValue = {
            target: {}
        };
        const props = givenProps('', min, max, () => {
        }, {position: 'right'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        instance.set('');

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];
        const inputNode = productCounterSection.props().children[2];

        inputNode.props.onChange(targetValue);
        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].value).to.deep.equal('');
    });

    it('should trigger onChange function when target is changed and target value is not a number', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const min = 4;
        const max = 3;
        let targetValue = {
            target: chance.string()
        };
        const props = givenProps('', min, max, () => {
        }, {position: 'right'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        instance.set('');

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];
        const inputNode = productCounterSection.props().children[2];

        inputNode.props.onChange(targetValue);
        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].value).to.deep.equal('');
    });

    it('should trigger onChange function when target is changed and target value', () => {
        //given
        window = jsdom.jsdom().defaultView;
        global.window = window;
        const min = 4;
        const max = 3;
        let targetValue = {
            target: {
                value: ''
            }
        };
        const props = givenProps('', min, max, () => {
        }, {position: 'right'});

        //when
        const productCounterSection = shallow(<CounterInput {...props} />);
        let instance = mountCounterInputComponent(props).instance();
        sandbox.spy(instance, 'setState');
        instance.set('');

        // then
        const glyphPlusNode1 = productCounterSection.props().children[3];
        const inputNode = productCounterSection.props().children[2];

        inputNode.props.onChange(targetValue);
        glyphPlusNode1.props.onClick();

        expect(instance.setState).to.have.callCount(1);
        expect(instance.setState.firstCall.args[0].value).to.deep.equal('');
    });
});
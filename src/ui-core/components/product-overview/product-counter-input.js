import React from 'react';

export default class CounterInput extends React.Component {
    constructor(props) {
        super(props);

        const {value, min, max} = this.parseProps();

        this.state = {
            value: (value < min) ? min : (value > max) ? max : value,
            min: min || 0,
            max: max || -1,
            glyphPlus: this.props.glyphPlus || {
                glyph: "fa fa-plus",
                position: this.props.glyphMinus !== undefined && this.props.glyphMinus === "right" ? "left" : "right"
            },
            glyphMinus: this.props.glyphMinus || {
                glyph: "fa fa-minus",
                position: this.props.glyphPlus !== undefined && this.props.glyphPlus === "left" ? "right" : "left"
            },
            styles: this.props.styles || {cursor: 'pointer'}
        }
    }

    componentWillReceiveProps(nextProps) {
        const newProps = this.parseProps(nextProps);
        const props = this.parseProps(this.props);

        if (newProps.value !== props.value || newProps.min !== props.min || newProps.max !== props.max) {
            this.setState({...newProps});
        }
    }

    parseProps(props = this.props) {
        return {
            value: parseInt(props.value, 10),
            min: parseInt(props.min, 10),
            max: parseInt(props.max, 10)
        }
    }

    set(value) {
        this.setState({
            value
        });
        this.props.onChange(value);
    }

    onChange(e) {
        let newValue = e.target.value;

        if (newValue === '') {
            this.set(this.state.min)
        } else if ((newValue > this.state.max && this.state.max !== -1) || newValue < this.state.min) {
            return;
        } else if (typeof newValue != 'number') {
            var parsed = parseInt(newValue, 10);

            if (isNaN(parsed)) {
                this.set(this.state.min)
            } else {
                this.set(parsed);
            }
        }
    }

    increment(value) {
        if (value === '') {
            this.set(this.state.min)
        } else {
            let parsed = parseInt(value, 10);

            if (isNaN(parsed)) {
                this.set(this.state.min)
            } else {
                if (value < this.state.max || this.state.max === -1) {
                    this.set(parsed + 1)
                }
            }
        }
    }

    decrement(value) {
        if (value === '') {
            this.set(this.state.min)
        } else {
            let parsed = parseInt(value, 10);

            if (isNaN(parsed)) {
                this.set(this.state.min)
            } else {
                if (value > this.state.min) {
                    this.set(parsed - 1)
                }
            }
        }
    }

    render() {
        const {value, glyphPlus, glyphMinus} = this.state;
        const styles = this.state.styles;

        return (
            <div className="input-buttons">
                <span className='quantity-placeholder'>Quantity </span>
                {glyphPlus.position === "left" ?
                    <div className="input-group-addon w-75 add-on-plus " style={styles} onClick={() => {
                        this.increment(value)
                    }}>
                        <i className={glyphPlus.glyph}/>
                    </div> :
                    <div className="input-group-addon w-75 add-on-plus" style={styles} onClick={() => {
                        this.decrement(value)
                    }}>
                        <i className={glyphMinus.glyph}/>
                    </div>
                }
                <input className="text-center" type="text" onChange={this.onChange.bind(this)} value={value}/>
                {glyphPlus.position === "right" ?
                    <span className="input-group-addon w-75 add-on-minus" style={styles} onClick={() => {
                        this.increment(value)
                    }}>
						<i className={glyphPlus.glyph}/>
					</span> :
                    <span className="input-group-addon w-75 add-on-minus" style={styles} onClick={() => {
                        this.decrement(value)
                    }}>
						<i className={glyphMinus.glyph}/>
					</span>
                }
            </div>
        )
    }
}
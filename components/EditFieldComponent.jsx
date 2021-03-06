EditFieldComponent = React.createClass({
	onValidate(error) {
		//console.log(this.props.id, 'validating', error)
		const isSet = (this.state && this.state.error);
		if(!isSet && error) {
			this.setState({ error: true });
		} else if(isSet && !error) {
			this.setState({ error: false });
		}

		if(this.props.onValidate && typeof this.props.onValidate === 'function') {
			this.props.onValidate.apply(this, arguments);
		}
	},
	formGroupClass() {
		return 'form-group' + 
			(this.props && this.props.col ? ' '+this.props.col : '') + 
			(this.state && this.state.error ? ' has-error' : '');
	},
	render() {
		var fieldElement = false;

		switch(this.props.type) {
			case 'tags': 
				fieldElement = (<SimpleForm.TagsInput {...this.props} />);
				break;
			case 'textarea':
			case 'text':
			default: 
				fieldElement = (<SimpleForm.TextInput
					placeholder={this.props.display}
					solveDirty={SimpleForm.remotePriority}
					className="form-control"
					{...this.props}
				/>);
				break;
		}

		return (
			<div className={this.formGroupClass(this.props.name||this.props.id)}>
				<label htmlFor={this.props.id}>{this.props.display}</label>
				{fieldElement}
			</div>
		);
	}
});
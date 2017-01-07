import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPrompts } from '../actions/actions';

import PromptTile from './prompt_tile';

class PromptContainer extends  Component {

  componentWillMount() {
    this.props.fetchPrompts();
  }

	renderPrompts () {
    console.log('PROMPT CONTAINER OUTSIDE: ', this.props);
		return this.props.prompts.map((prompt) => {
      console.log('MAPPING PROMPT: ', prompt);
			return(
				<PromptTile
				prompt={prompt}
				{...prompt}
				key={prompt.id} />
			)
		});
	}


	render () {
    return (
      	<div className="prompt-container">
        	{this.renderPrompts.bind(this)()}
      	</div>

    );
  }
}

function mapStateToProps (state) {
  return {prompts: state.prompts};
}


export default connect(mapStateToProps, { fetchPrompts })(PromptContainer);
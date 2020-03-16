import React from 'react'
import {Playground, store} from 'graphql-playground-react'
import {Provider, } from 'react-redux'

export default () => (
    <Provider store={store}>
		<Playground endpoint="https://api.graph.cool/simple/v1/swapi" />
	</Provider>
)

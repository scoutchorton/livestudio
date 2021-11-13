<template>
	<div id="preload">
		<img src="./assets/logo/black-logo.svg" class="logo" />
		<img src="./assets/interface/loading.svg" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ipcRenderer } from "electron";
import * as LiveStudio from "../api/LiveStudio";

@Component({})
export default class App extends Vue {
	constructor() {
		super();
		LiveStudio.Internal.File.generateStrcuture();
	}
	/*
	constructor() {
		ipcRenderer.invoke("PageLoad").then();
	}
	*/
}
</script>

<style lang="sass">
@use './sass/variables'

@keyframes loading
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(180deg)
	100%
		transform: rotate(360deg)

html, body
	display: flex
	height: 100%
	margin: 0
	padding: 0
	width: 100%

	flex-direction: column
	
	background: variables.$charcoal
	font-family: "Roboto", Arial, Helvetica, sans-serif
	user-select: none

#preload
	display: flex
	height: 100%
	position: absolute
	visibility: visible
	width: 100%
	z-index: 100

	align-items: center
	flex-direction: column
	justify-content: center

	background: variables.$charcoal
	color: variables.$light-charcoal

	transition: opacity 2s linear 0s, visibility 0s linear 2s

	/* Logo and loading spiral */
	img
		height: 2.5em
		margin: 1em
		padding: 0.5em

		background: variables.$light-charcoal

	/* Just loading spiral */
	img:not(.logo)
		border-radius: 50%
		animation: loading 1s linear 0s infinite normal none
	
	&.hidden
		opacity: 0
		visibility: hidden

		transition: opacity 1.5s ease-out 0s, visibility 0s linear 1.5s
</style>

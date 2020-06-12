# boxes-react-bridge

Renderer-agnostic bindings for boxes — Create and compose boxes scenes with any react renderer.


## Installation

```
yarn add @downpourdigital/boxes-react-bridge
```
```
npm i --save @downpourdigital/boxes-react-bridge
```

## Usage
```typescript
import {
	BoxesRoot,
	Renderable,
	TransformNode,
	PerspectiveWrapper,
	MatchGlTransform,
} from '@downpourdigital/boxes-react-bridge';

```

### Concept

`boxes-react-bridge` only "renders" your elements into a container. This can be a boxes `Scene` or anything living in the boxes scene graph.
What you do with the scene is then up to you – rendering, materials and geometries have to be done the "traditional", imperative way.

### Prerequisites
First, you'll have to specify a point from which to tap into the react tree. This could be the root of your app. E.g. with `ReactDOM`:

```tsx
const scene = new Scene();

ReactDOM.render(
	<BoxesRoot container={scene}>
		<App />
	</BoxesRoot>,
	document.getElementById( 'root' ),
);

```
All `boxes` related nodes inside `<BoxesRoot>` will now be mounted into `scene`.

### Nodes

For now, only `Renderable` and `TransformNode` are represented. The node's props closely match their imperative counterparts. Additionally react `ref` props can be used and transforms can be supplied as arrays. 

```tsx
() => {
	const ref = useRef();
	
	return (
		<TransformNode
			ref={ref}
			translation={[1, 2, 3]}
		>
		</TransformNode>
	);
}

```

### Transform matching for DOM Elements
`boxes-react-bridge` can convert boxes transforms to CSS transforms to sync DOM content to WebGL. Right now, only `PerspectiveCameras` are supported.

To get the correct CSS perspective, wrap your App in a `<PerspectiveWrapper>` component. This'll create a `<div>` with the necessary styles.

```tsx
ReactDOM.render(
	<BoxesRoot container={scene}>
		<PerspectiveWrapper
		
			// your canvas dimensions in pixels
			width={1024} 
			height={1024}
			
			// the camera from which you're projecting
			camera={scene.activeCamera} 
		>
			<App />
		</PerspectiveWrapper>
	</BoxesRoot>,
	document.getElementById( 'root' ),
);

```
Now you can place a `<MatchGlTransform>` component inside the node with which you want to sync the transforms. This'll place a `<div>` **at the origin** of the node. You may have to fight with CSS for a bit to get things looking right.

```tsx
<Renderable
	geometry={geometry}
	material={material}
>
	<MatchGlTransform>
		<div style={{
			transform: 'translate3d(-50%, 50%, 0)',
			border: '1px solid red',
			width: '10vh',
			height: '10vh',
		}}
		>
			SYNCED TRANSFORMS!
		</div>
	</MatchGlTransform>
</Renderable>

```

## License

© 2020 [DOWNPOUR DIGITAL](https://downpour.digital), licensed under BSD-4-Clause

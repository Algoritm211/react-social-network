import React, {Component, ComponentType} from "react";
import {compose} from "redux";



function WithRRHOC<WCP extends {modelRR: string}> (WrappedComponent: React.ComponentType<WCP>) {
  const WithRR: React.FC<Omit<WCP, 'modelRR'>> = (props) => {
    return (
      <div>
        <WrappedComponent {...props as WCP} modelRR={'Wraith'}/>
      </div>
    )
  }
  return WithRR
}

function WithPorscheHOC<WCP extends {modelPorsche: string}> (WrappedComponent: React.ComponentType<WCP>) {
  const WithPorsche: React.FC<Omit<WCP, 'modelPorsche'>> = (props) => {
    return (
      <div>
        <WrappedComponent {...props as WCP} modelPorsche={'911 turbo S'}/>
      </div>
    )
  }
  return WithPorsche
}



type AlexComponentProps = {
  name: string
  modelRR: string,
  modelPorsche: string
}

const AlexComponent = (props: AlexComponentProps) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

// const AlexComponentWithRR = WithRRHOC(AlexComponent)
// const AlexComponentPorsche = WithPorscheHOC(AlexComponentWithRR)

type FromRRPropsType = Omit<AlexComponentProps, 'modelRR'>
type FromRRPropsComponentType = React.ComponentType<FromRRPropsType>
type FromPorschePropsType = React.ComponentType<Omit<FromRRPropsType, 'modelPorsche'>>
//
// const AlexComponentRender = compose<
//   FromRRPropsComponentType,
//   React.ComponentType<AlexComponentProps>,
//   FromPorschePropsType
//   >(
//   WithPorscheHOC,
//   WithRRHOC,
// )(AlexComponent)

const AlexComponentRender = compose<FromPorschePropsType>(
  WithPorscheHOC,
  WithRRHOC,
)(AlexComponent)



const MainComponent = () => {
  return (
    <AlexComponentRender name={'Alex'} />
  )
}
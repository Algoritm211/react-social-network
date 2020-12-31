import React from "react";
import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("Check if receives status", () => {
    const component = create(<ProfileStatus status='Rolls-Royce'/>);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Rolls-Royce");
  });

  test('Check if renders span', () => {
    const component = create(<ProfileStatus status='Rolls-Royce'/>);
    const root = component.root
    const span = root.findByType('span')
    expect(span.children[0]).toEqual('Rolls-Royce')
  })

  test('No render input from start render', () => {
    const component = create(<ProfileStatus status='Rolls-Royce'/>);
    const root = component.root
    expect(() => {
      const span = root.findByType('input')
    }).toThrow()
  })

  test('Input should be displayed after double click', () => {
    const component = create(<ProfileStatus status='Rolls-Royce'/>);
    const root = component.root
    const span = root.findByType('span')
    span.props.onDoubleClick();
    const input = root.findByType('input')
    expect(input.props.value).toEqual('Rolls-Royce');
  })

  test('Enable editMode', () => {
    const component = create(<ProfileStatus status='Rolls-Royce'/>);
    const instance = component.getInstance()
    const root = component.root
    const span = root.findByType('span')
    span.props.onDoubleClick();
    expect(instance.state.editMode).toBeTruthy();
  })


  test('Callback should be called', () => {
    const mockCallback = jest.fn((value) => {
    })
    const component = create(<ProfileStatus status='Rolls-Royce' updateStatus={mockCallback}/>);
    const instance = component.getInstance()
    instance.disableEditMode()
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.calls[0][0]).toBe('Rolls-Royce')
  })

});
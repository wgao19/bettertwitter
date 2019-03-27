import React, { ReactNode } from 'react'
import styled from 'styled-components'

export enum FilterTypes {
  media = 'media',
  images = 'images',
  vine = 'vine',
  native_video = 'native_video',
  periscope = 'periscope',
  news = 'news',
  links = 'links',
  safe = 'safe',
  verified = 'verified',
  retweets = 'retweets',
  nativeretweets = 'nativeretweets'
}
export type FieldStateType = 'inactive' | 'filterFor' | 'filterOut'
interface MyProps {
  /** Label for filter
   * @default ''
   * */
  label?: string
  /** State of the inputfield */
  fieldState: FieldStateType
  /** The valid boolean filter types from Twitter */
  filterType: FilterTypes
  /** I will pass you the next state which you can set to fieldState */
  onChange?: (value: FieldStateType) => void
  children?: ReactNode
}

const Styled = styled.div`
  padding: 10px;
  display: inline-flex;
  border: 1px solid ${(props: { fieldStateColor: string }) => props.fieldStateColor};
  color: ${(props: { fieldStateColor: string }) => props.fieldStateColor};
`

const StateMachine = {
  inactive: 'filterFor',
  filterFor: 'filterOut',
  filterOut: 'inactive'
}

/**
 * Filter field
 */
export default function FilterField(props: MyProps) {
  const { fieldState, filterType, label = '', onChange = () => {}, children } = props
  const fieldStateColor: string = {
    inactive: 'grey',
    filterFor: 'lightgreen',
    filterOut: 'red'
  }[fieldState]
  const emoji: string = {
    inactive: '☐',
    filterFor: '✓',
    filterOut: '✖'
  }[fieldState]

  const onClick = () => onChange(StateMachine[fieldState] as FieldStateType)
  return (
    <Styled fieldStateColor={fieldStateColor} onClick={onClick}>
      {label}
      <span style={{ width: '2rem', height: '1rem' }}>{emoji}</span>
      <span>{filterType}</span>
      {children}
    </Styled>
  )
}

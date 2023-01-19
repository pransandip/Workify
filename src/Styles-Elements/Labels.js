import styled from "styled-components/macro";
import * as FontStyles from "./FontStyles";

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => props.flexWrap};
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  white-space: ${(props) => props.whiteSpace};
  max-height: ${(props) => props.maxHeight};
  overflow-x: ${(props) => props.overflowX};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  transition: transform 0.2s ease-in-out;
  &::after {
    content: "";
    padding-right: 20px;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1000px) {
    padding: ${(props) => props.mobilePadding};
  }
`;

LabelWrapper.defaultProps = {
  flexWrap: "wrap",
  justifyContent: "flex-start",
  whiteSpace: "normal",
  overflowX: "visible",
};

const LabelProvider = styled.div`
  font-family: ${(props) =>
    props.fontFamily
      ? props.fontFamily
      : FontStyles.getFontFamily(props.theme)};
  font-weight: ${(props) =>
    props.fontWeight
      ? props.fontWeight
      : FontStyles.getFontWeight(props.theme)};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : FontStyles.getFontSize(props.theme)};
  text-align: ${(props) => props.textAlign};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex-grow: ${(props) => props.flexGrow};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  letter-spacing: ${(props) => props.letterSpacing};
  border-bottom: ${(props) => props.borderBottom};
  cursor: ${(props) => props.cursor};
  text-decoration: ${(props) => props.textDecoration};
  text-transform: ${(props) => props.textTransform};
  user-select: ${(props) => props.userSelect};
  classname: ${(props) => props.className};
  font-weight: ${(props) => props.fontWeight};
`;

// @media (max-width: 1000px) {
//   font-size: ${props => props.theme === FontStyles.title1Large ? '40px' : ''};
// }

LabelProvider.defaultProps = {
  theme: FontStyles.body,
  textAlign: "left",
  padding: "initial",
  margin: "initial",
  flexGrow: 0,
  color: "black",
  lineHeight: "normal",
  letterSpacing: "normal",
  borderBottom: "medium none color",
  textDecoration: "none currentcolor solid",
};

/**
 * Represents a div with
 * font size: 40px
 * font name: Roboto
 * font weight: Bold
 */
export function Heading1Bold(props) {
  return (
    <LabelProvider
      theme={FontStyles.heading1Bold}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 32px
 * font name: Roboto
 * font weight: Bold
 */
export function Heading2Bold(props) {
  return (
    <LabelProvider
      theme={FontStyles.heading2Bold}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 24px
 * font name: Roboto
 * font weight: Bold
 */
export function Heading3Bold(props) {
  return (
    <LabelProvider
      theme={FontStyles.heading3Bold}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 20px
 * font name: Roboto
 * font weight: Medium
 */
export function Heading4Medium(props) {
  return (
    <LabelProvider
      theme={FontStyles.heading4Medium}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 18px
 * font name: Roboto
 * font weight: Medium
 */
export function Heading5Medium(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading5Medium}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 16px
 * font name: Roboto
 * font weight: Medium
 */
export function Heading6Medium(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading6Medium}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 14px
 * font name: Roboto
 * font weight: Regular
 */
export function Body(props) {
  return (
    <LabelProvider
      theme={FontStyles.body}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 14px
 * font name: Roboto
 * font weight: Medium
 */
export function InputLabel(props) {
  return (
    <LabelProvider
      theme={FontStyles.InputLabel}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      style={props.style}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 14px
 * font name: Roboto
 * font weight: Regular
 */
export function Link(props) {
  return (
    <LabelProvider
      theme={FontStyles.body}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 12px
 * font name: Roboto
 * font weight: Regular
 */
export function Small(props) {
  return (
    <LabelProvider
      theme={FontStyles.small}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      value={props.value}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
      style={props.style}
    >
      {props.text}
    </LabelProvider>
  );
}

export function Disable(props) {
  return (
    <LabelProvider
      theme={FontStyles.small}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      value={props.value}
      cursor={props.cursor}
      className={props.className}
      disabled={props.disabled}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 12px
 * font name: Roboto
 * font weight: Regular
 */
export function Error(props) {
  return (
    <LabelProvider
      theme={FontStyles.error}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </LabelProvider>
  );
}

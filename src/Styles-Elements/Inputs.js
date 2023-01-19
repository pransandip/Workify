import styled from "styled-components/macro";
import * as Colors from "./Colors";
import * as FontStyles from "./FontStyles";

export const InputWrapper = styled.div`
  position: relative;
  margin: auto;
`;

const InputProvider = styled.input`
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  border-style: ${(props) => props.borderStyle};
  box-shadow: none;
  placeholder: ${(props) => props.placeholder};
  margin: ${(props) => props.margin};
  min-height: ${(props) => props.minHeight};
  maxWidth: ${(props) => props.maxWidth};
  minWidth: ${(props) => props.minWidth};
  padding: ${(props) => props.padding};
  textAlign: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.body)};
  font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
  font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
  width: ${(props) => props.width};
  type: ${(props) => props.type};
  box-sizing: border-box;
  className: ${(props) => props.className}
  value: ${(props) => props.value}
  ::placeholder {
    font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.body)};
    font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
    font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
    color: ${Colors.lightGray};
  }

  :focus {
    outline: none;
  }

  `;

InputProvider.defaultProps = {
  borderRadius: "4px",
  borderWidth: "1px",
  borderColor: Colors.lightGreen,
  backgroundColor: Colors.lightGreen,
  borderStyle: "solid",
  placeholder: "Placeholder",
  margin: "0px",
  minHeight: "40px",
  maxWidth: "200px",
  minWidth: "150px",
  padding: "7px 16px",
  textAlign: "left",
  color: Colors.nightGray,
  width: "100%",
};

const InputSearchProvider = styled.input`
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  border-style: ${(props) => props.borderStyle};
  box-shadow: none;
  placeholder: ${(props) => props.placeholder};
  margin: ${(props) => props.margin};
  min-height: ${(props) => props.minHeight};
  maxWidth: ${(props) => props.maxWidth};
  minWidth: ${(props) => props.minWidth};
  padding: ${(props) => props.padding};
  textAlign: ${(props) => props.textAlign};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.body)};
  font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
  font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
  width: ${(props) => props.width};
  type: ${(props) => props.type};
  className: ${(props) => props.className}
  box-sizing: border-box;

  ::placeholder {
    font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.body)};
    font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
    font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
    color: ${Colors.lightGray};
  }

  :focus {
    outline: none;
  }
  `;

InputSearchProvider.defaultProps = {
  borderRadius: "4px",
  borderWidth: "0px",
  borderColor: Colors.lightGreen,
  borderStyle: "solid",
  backgroundColor: Colors.lightGreen,
  placeholder: "Placeholder",
  margin: "0px",
  minHeight: "40px",
  maxWidth: "200px",
  minWidth: "150px",
  padding: "7px 16px",
  textAlign: "left",
  color: Colors.nightGray,
  width: "100%",
};

const TextAreaProvider = styled.textarea`
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
  border-style: ${(props) => props.borderStyle};
  box-shadow: none;
  placeholder: ${(props) => props.placeholder};
  margin: ${(props) => props.margin};
  min-height: ${(props) => props.minHeight};
  maxWidth: ${(props) => props.maxWidth};
  minWidth: ${(props) => props.minWidth};
  padding: ${(props) => props.padding};
  textAlign: ${(props) => props.textAlign};
  color: ${(props) => props.color};
  font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.body)};
  font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
  font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
  width: ${(props) => props.width};
  type: ${(props) => props.type};
  className: ${(props) => props.className}
  box-sizing: border-box;
 
  ::placeholder {
    font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.body)};
    font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
    font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
    color: ${Colors.lightGray};
  }

  :focus {
    outline: none;
  }
  `;

TextAreaProvider.defaultProps = {
  borderRadius: "4px",
  borderWidth: "0px",
  borderColor: Colors.lightGreen,
  backgroundColor: Colors.lightGreen,
  borderStyle: "solid",
  placeholder: "Placeholder",
  margin: "0px",
  minHeight: "140px",
  maxWidth: "200px",
  minWidth: "150px",
  padding: "7px 16px",
  textAlign: "left",
  color: Colors.nightGray,
  width: "95%",
};

/**
 * Represents a regular textfield with
 * font size: 16px
 * font name: Roboto
 * font weight: Regular
 * padding: 12px 16px
 */
export function Textfield(props) {
  return (
    <InputProvider
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      className={props.className}
      value={props.value}
      padding={"10px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={Colors.nightGray}
      backgroundColor={Colors.lightGreen}
      borderRadius={"4px"}
      borderWidth={"1px"}
      textAlign={props.width}
      width={props.width}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
      style={props.style}
      maxLength={props.maxLength}
    >
      {props.text}
    </InputProvider>
  );
}

/**
 * Represents a regular textsearchfield with
 * font size: 14px
 * font name: Roboto
 * font weight: Midium
 * padding: 12px 16px
 */
export function TextSearchfield(props) {
  return (
    <InputSearchProvider
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      className={props.className}
      padding={"8px 16px 8px 40px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={Colors.nightGray}
      borderWidth={"1px"}
      borderColor={Colors.lightGreen}
      backgroundColor={Colors.lightGreen}
      theme={FontStyles.body}
      textAlign={props.width}
      width={props.width}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
    >
      {props.text}
    </InputSearchProvider>
  );
}

/**
 * Represents a regular textfield(textarea) with
 * font size: 16px
 * font name: Roboto
 * font weight: Regular
 * padding: 12px 16px
 */
export function TextAreafield(props) {
  return (
    <TextAreaProvider
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      className={props.className}
      padding={"12px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={Colors.nightGray}
      borderRadius={"4px"}
      borderWidth={"0px"}
      textAlign={props.width}
      width={props.width}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
    >
      {props.text}
    </TextAreaProvider>
  );
}

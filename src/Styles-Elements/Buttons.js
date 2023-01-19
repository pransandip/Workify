import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import * as Colors from "./Colors";
import * as FontStyles from "./FontStyles";
import styled, { css, keyframes } from "styled-components/macro";

export const ButtonWrapper = styled.div`
  position: relative;
  margin: ${(props) => props.margin};
  width: 100%;
`;

const fadeInKeyframe = keyframes`
  from {opacity: 0.1;}
  to {opacity: 1;}
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;

  margin-top: 10px;
`;

const animation = (props) =>
  css`
    ${fadeInKeyframe} 0.6s linear;
  `;

const ButtonProvider = styled.button`
  font-weight: ${(props) =>
    FontStyles.getFontWeight(FontStyles.Heading6Medium)};
  font-size: ${(props) => FontStyles.getFontSize(FontStyles.body)};
  font-family: ${(props) => FontStyles.getFontFamily(FontStyles.body)};
  Height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex-grow: ${(props) => props.flexGrow};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
  width: ${(props) => props.width};
  white-space: nowrap;
  text-decoration: ${(props) => props.textDecoration};
  cursor: pointer;
  className: ${(props) => props.className};
  font-weight: ${(props) => props.fontWeight}
  &:focus {
    animation: ${(props) => (props.fadeIn === true ? animation : "")};
    outline: none;
  }


`;

ButtonProvider.defaultProps = {
  theme: FontStyles.body,
  padding: "initial",
  mobileMargin: "initial",
  margin: "initial",
  flexGrow: 0,
  backgroundColor: "initial",
  borderWidth: "0",
  borderColor: "initial",
  borderRadius: "0",
  color: "initial",
  textAlign: "initial",
  width: "100%",
  height: "initial",
  mobileWidth: "auto",
  fadeIn: "false",
};

/**
 * Represents a Bold button with
 * font size: 16px
 * font name: Roboto
 * font weight: Medium
 * background color: Secondary
 * padding: 16px 40px
 */
export function PrimaryButton(props) {
  return (
    <ButtonProvider
      padding={"12px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      backgroundColor={Colors.Secondary}
      color={Colors.Primary}
      fontWeight={props.fontWeight}
      borderRadius={"4px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"48px"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      className={props.className}
      disabled={props.disabled}
    >
      {props.text}
    </ButtonProvider>
  );
}

/**
 * Represents a Bold button with
 * font size: 16px
 * font name: Roboto
 * font weight: Medium
 * background color: Secondary
 * padding: 16px 40px
 */
export function SecondaryButton(props) {
  return (
    <ButtonProvider
      padding={"12px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      backgroundColor={Colors.Primary}
      color={Colors.whiteGray}
      borderRadius={"4px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"48px"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      className={props.className}
    >
      {props.loading && (
        <ClipLoader
          color="#fff"
          loading={props.loading}
          cssOverride={override}
          size={25}
        />
      )}
      <span style={{ marginLeft: `${props.loading ? `10px` : `0px`}` }}>
        {props.text}
      </span>
    </ButtonProvider>
  );
}

/**
 * Represents a Bold button with
 * font size: 16px
 * font name: Roboto
 * font weight: Medium
 * background color: Primary
 * padding: 16px 40px
 */
export function TertiaryButton(props) {
  return (
    <ButtonProvider
      padding={"8px 12px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      backgroundColor={Colors.Primary}
      color={Colors.whiteGray}
      borderRadius={"4px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"36px"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      className={props.className}
    >
      {props.text}
    </ButtonProvider>
  );
}

/**
 * Represents a Bold button with
 * font size: 16px
 * font name: Roboto
 * font weight: Medium
 * background color: Primary
 * padding: 16px 40px
 */
export function TransparentButton(props) {
  return (
    <ButtonProvider
      padding={"12px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      backgroundColor={"transparent"}
      color={props.disabled ? "grey" : Colors.Primary}
      borderRadius={"4px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"48px"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      className={props.className}
      disabled={props.disabled}
    >
      {props.text}
    </ButtonProvider>
  );
}

/**
 * Represents a Bold button with
 * font size: 16px
 * font name: Roboto
 * font weight: Medium
 * background color: Secondary
 * padding: 16px 40px
 */
export function NeutralLightButton(props) {
  return (
    <ButtonProvider
      padding={"12px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      backgroundColor={Colors.neutrallightGray}
      color={Colors.Primary}
      borderRadius={"4px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"48px"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      className={props.className}
    >
      {props.loading && (
        <ClipLoader
          color="#00294d"
          loading={props.loading}
          cssOverride={override}
          size={25}
        />
      )}
      <span style={{ marginLeft: `${props.loading ? `15px` : `0px`}` }}>
        {props.text}
      </span>
    </ButtonProvider>
  );
}

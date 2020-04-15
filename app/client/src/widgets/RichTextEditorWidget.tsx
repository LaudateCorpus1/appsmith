import React from "react";
import BaseWidget, { WidgetProps, WidgetState } from "./BaseWidget";
import { WidgetType } from "constants/WidgetConstants";
import { EventType } from "constants/ActionConstants";
import RichtextEditorComponent from "components/designSystems/appsmith/RichTextEditorComponent";
import { WidgetPropertyValidationType } from "utils/ValidationFactory";
import { VALIDATION_TYPES } from "constants/WidgetValidation";
import { TriggerPropertiesMap } from "utils/WidgetFactory";

class RichTextEditorWidget extends BaseWidget<
  RichTextEditorWidgetProps,
  WidgetState
> {
  static getPropertyValidationMap(): WidgetPropertyValidationType {
    return {
      placeholder: VALIDATION_TYPES.TEXT,
      defaultValue: VALIDATION_TYPES.TEXT,
      isDisabled: VALIDATION_TYPES.BOOLEAN,
      isVisible: VALIDATION_TYPES.BOOLEAN,
      onTextChange: VALIDATION_TYPES.ACTION_SELECTOR,
    };
  }

  static getTriggerPropertyMap(): TriggerPropertiesMap {
    return {
      onTextChange: true,
    };
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.defaultText) {
      this.updateWidgetMetaProperty("text", this.props.defaultText);
    }
  }

  componentDidUpdate(prevProps: RichTextEditorWidgetProps) {
    super.componentDidUpdate(prevProps);
    if (this.props.defaultText) {
      if (this.props.defaultText !== prevProps.defaultText) {
        this.updateWidgetMetaProperty("text", this.props.defaultText);
      }
    }
  }

  onValueChange = (text: string) => {
    this.updateWidgetMetaProperty("text", text);
    if (this.props.onTextChange) {
      super.executeAction({
        dynamicString: this.props.onTextChange,
        event: {
          type: EventType.ON_TEXT_CHANGE,
        },
      });
    }
  };

  getPageView() {
    return (
      <RichtextEditorComponent
        onValueChange={this.onValueChange}
        defaultValue={this.props.text}
        widgetId={this.props.widgetId}
        placeholder={this.props.placeholder}
        key={this.props.widgetId}
        isDisabled={this.props.isDisabled}
        isVisible={this.props.isVisible}
      />
    );
  }

  getWidgetType(): WidgetType {
    return "RICH_TEXT_EDITOR_WIDGET";
  }
}

export interface InputValidator {
  validationRegex: string;
  errorMessage: string;
}

export interface RichTextEditorWidgetProps extends WidgetProps {
  defaultText?: string;
  text?: string;
  placeholder?: string;
  onTextChange?: string;
  isDisabled?: boolean;
  isVisible?: boolean;
}

export default RichTextEditorWidget;

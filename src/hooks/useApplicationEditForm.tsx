import { useEffect, useState } from "react";
import { applicationsApi } from "../api/application_api.ts";
import type { ApplicationWithoutSessions } from "../types/application.ts";

export const editableApplicationFields = [
  "title",
  "alias",
  "path",
  "saveSession",
] as const;

export type EditableApplicationField =
  (typeof editableApplicationFields)[number];

interface UseApplicationEditFormOptions<
  TApplication extends ApplicationWithoutSessions,
> {
  application: TApplication;
  onUpdated?: (application: TApplication) => void;
}

export const useApplicationEditForm = <
  TApplication extends ApplicationWithoutSessions,
>({
  application,
  onUpdated,
}: UseApplicationEditFormOptions<TApplication>) => {
  const [savedApplication, setSavedApplication] =
    useState<TApplication>(application);
  const [formApplication, setFormApplication] =
    useState<TApplication>(application);
  const [isApplicationUpdated, setIsApplicationUpdated] = useState(false);

  useEffect(() => {
    setSavedApplication(application);
    setFormApplication(application);
  }, [application]);

  const isFormPropertyChanged = (property: EditableApplicationField) => {
    return formApplication[property] !== savedApplication[property];
  };

  const isTitleChanged = isFormPropertyChanged("title");
  const isAliasChanged = isFormPropertyChanged("alias");
  const isPathChanged = isFormPropertyChanged("path");
  const isSaveSessionChanged = isFormPropertyChanged("saveSession");

  const isDirty =
    isTitleChanged || isAliasChanged || isPathChanged || isSaveSessionChanged;

  const updateField = <TField extends EditableApplicationField>(
    field: TField,
    value: TApplication[TField],
  ) => {
    setFormApplication((currentApplication) => ({
      ...currentApplication,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormApplication(savedApplication);
  };

  const submitForm = async () => {
    await applicationsApi.update(formApplication);

    setSavedApplication(formApplication);
    setFormApplication(formApplication);
    setIsApplicationUpdated(true);

    onUpdated?.(formApplication);
  };

  return {
    savedApplication,
    formApplication,
    setFormApplication,
    isApplicationUpdated,
    setIsApplicationUpdated,

    isTitleChanged,
    isAliasChanged,
    isPathChanged,
    isSaveSessionChanged,
    isDirty,

    updateField,
    resetForm,
    submitForm,
  };
};

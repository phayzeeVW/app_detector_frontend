import { useEffect, useState } from "react";
import type { ApplicationSummary } from "../../types/application.ts";
import { MdLock, MdLockOpen } from "react-icons/md";
import { applicationsApi } from "../../api/application_api.ts";
import Alert from "../core/Alert.tsx";

interface ApplicationEditDrawerProps {
  application: ApplicationSummary;
  onUpdated: (application: ApplicationSummary) => void;
}

export const ApplicationEditDrawer = ({
  application,
  onUpdated,
}: ApplicationEditDrawerProps) => {
  const [savedApplication, setSavedApplication] =
    useState<ApplicationSummary>(application);
  const [formApplication, setFormApplication] =
    useState<ApplicationSummary>(application);
  const [titleDisabled, setTitleDisabled] = useState(true);
  const [pathDisabled, setPathDisabled] = useState(true);
  const [isApplicationUpdated, setIsApplicationUpdated] = useState(false);

  const isTitleChanged =
    savedApplication?.title !== undefined &&
    formApplication?.title !== savedApplication.title;

  const isPathChanged =
    savedApplication?.path !== undefined &&
    formApplication?.path !== savedApplication.path;

  const isAliasChanged =
    savedApplication?.alias !== undefined &&
    formApplication?.alias !== savedApplication.alias;

  const isSaveSessionChanged =
    savedApplication?.saveSession !== undefined &&
    formApplication?.saveSession !== savedApplication.saveSession;

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (formApplication) {
      applicationsApi.update(formApplication).then(() => {
        setSavedApplication(formApplication);
        setFormApplication(formApplication);
        setIsApplicationUpdated(true);

        onUpdated(formApplication);
      });
    }
  };

  useEffect(() => {
    setSavedApplication(application);
    setFormApplication(application);
  }, [application]);

  return (
    formApplication && (
      <aside className="min-h-full w-full max-w-xl bg-base-300 p-6">
        <section className="card border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body gap-6">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h2 className="card-title text-2xl font-bold">
                  Edit Application
                </h2>

                <p className="text-sm text-base-content/60">
                  Update metadata and session tracking settings.
                </p>
              </div>

              <div className="badge badge-soft badge-info shrink-0">
                ID: {formApplication.id}
              </div>
            </header>

            <form className="space-y-5" onSubmit={onFormSubmit}>
              <fieldset className="fieldset">
                <label htmlFor="title" className="fieldset-legend">
                  Title*
                </label>

                <div className="flex items-center gap-2">
                  <input
                    disabled={titleDisabled}
                    id="title"
                    type="text"
                    className={`input w-full ${isTitleChanged ? "input-accent" : ""}`}
                    value={formApplication.title}
                    onChange={(event) =>
                      setFormApplication({
                        ...formApplication,
                        title: event.target.value,
                      })
                    }
                    placeholder="Application title"
                  />
                  <button
                    type="button"
                    onClick={() => setTitleDisabled(!titleDisabled)}
                    className="hover:text-info cursor-pointer"
                  >
                    {titleDisabled ? (
                      <MdLock size={30} />
                    ) : (
                      <MdLockOpen size={30} />
                    )}
                  </button>
                </div>

                <p className="fieldset-label">
                  The display name shown in the applications list.
                </p>

                <p className="fieldset-label">
                  *Modifying can lead to unexpected results.
                </p>
              </fieldset>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <label htmlFor="alias" className="fieldset-legend">
                    Alias
                  </label>
                  <input
                    id="alias"
                    type="text"
                    className="input w-full"
                    value={formApplication.alias}
                    onChange={(event) =>
                      setFormApplication({
                        ...formApplication,
                        alias: event.target.value,
                      })
                    }
                    placeholder="short-name"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label htmlFor="rawgGameId" className="fieldset-legend">
                    RAWG Game ID
                  </label>
                  <input
                    id="rawgGameId"
                    type="text"
                    className="input w-full"
                    value={formApplication.rawgGameId}
                    min={0}
                    disabled
                  />
                </fieldset>
              </div>

              <fieldset className="fieldset">
                <label className="fieldset-legend">Executable Path*</label>

                <div className="flex items-center gap-2">
                  <input
                    disabled={pathDisabled}
                    type="text"
                    className={`input w-full ${isPathChanged ? "input-accent" : ""}`}
                    value={formApplication.path}
                    onChange={(event) =>
                      setFormApplication({
                        ...formApplication,
                        path: event.target.value,
                      })
                    }
                    placeholder="C:\Path\To\Application.exe"
                  />

                  <button
                    type="button"
                    onClick={() => setPathDisabled(!pathDisabled)}
                    className="hover:text-info cursor-pointer"
                  >
                    {pathDisabled ? (
                      <MdLock size={30} />
                    ) : (
                      <MdLockOpen size={30} />
                    )}
                  </button>
                </div>

                <p className="fieldset-label">
                  Full path to the executable or launch target.
                </p>

                <p className="fieldset-label">
                  *Modifying can lead to unexpected results.
                </p>
              </fieldset>

              <div className="divider">Session Settings</div>

              <div
                className={`rounded-box border ${isSaveSessionChanged ? "border-accent" : "border-base-200"} bg-base-200 p-4`}
              >
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span>
                    <span className="block font-medium">Save sessions</span>
                    <span className="text-sm text-base-content/60">
                      Track launches and session history for this application.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={formApplication.saveSession}
                    onChange={(event) =>
                      setFormApplication({
                        ...formApplication,
                        saveSession: event.target.checked,
                      })
                    }
                  />
                </label>
              </div>

              <div className="card-actions justify-end pt-2">
                <label htmlFor="edit-drawer" className="btn btn-error">
                  Cancel
                </label>

                <button
                  type="submit"
                  disabled={
                    !isTitleChanged &&
                    !isPathChanged &&
                    !isAliasChanged &&
                    !isSaveSessionChanged
                  }
                  className="btn btn-primary px-8"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>

        {isApplicationUpdated && (
          <Alert
            className="mt-4 alert-soft shadow-xl"
            type="success"
            message="Application updated successfully!"
            onClose={() => setIsApplicationUpdated(false)}
            duration={3000}
          />
        )}
      </aside>
    )
  );
};

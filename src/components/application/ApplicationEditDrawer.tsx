import type { ApplicationSummary } from "../../types/application.ts";

interface ApplicationEditDrawerProps {
  application: ApplicationSummary | null;
}

export const ApplicationEditDrawer = ({
  application,
}: ApplicationEditDrawerProps) => {
  return (
    application && (
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
                ID: {application.id}
              </div>
            </header>

            <form className="space-y-5">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className="input w-full"
                  value={application.title}
                  placeholder="Application title"
                />
                <p className="fieldset-label">
                  The display name shown in the applications list.
                </p>
              </fieldset>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Alias</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={application.alias}
                    placeholder="short-name"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">RAWG Game ID</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={application.rawgGameId}
                    min={0}
                    disabled
                  />
                </fieldset>
              </div>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Executable Path</legend>
                <input
                  disabled
                  type="text"
                  className="input w-full"
                  value={application.path}
                  placeholder="C:\Path\To\Application.exe"
                />
                <p className="fieldset-label">
                  Full path to the executable or launch target.
                </p>
              </fieldset>

              <div className="divider">Session Settings</div>

              <div className="rounded-box border border-base-300 bg-base-200 p-4">
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
                    checked={application.saveSession}
                  />
                </label>
              </div>

              <div className="card-actions justify-end pt-2">
                <label htmlFor="edit-drawer" className="btn btn-neutral">
                  Cancel
                </label>

                <button type="submit" className="btn btn-primary px-8">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>
      </aside>
    )
  );
};

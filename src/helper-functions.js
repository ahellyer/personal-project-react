export const forkEventsTransform = (events) => {

const filtered =
  events.filter((item) => item.type==="ForkEvent" ).map((item, i) => (
        {type: item.type,
        id: item.payload.forkee.id,
        actor: item.actor,
        originalRepo: item.repo,
        forkedRepoURL: item.payload.forkee.html_url,
        forkedRepoFetchURL: item.payload.forkee.url,
        forkedRepoName: item.payload.forkee.name}
        ))
  return filtered;
}

export const pullEventsTransform = (events) => {
  const filtered =
  events.filter((item) => item.type==="PullRequestEvent" ).map((item, i) => (
  {type: item.type,
   actor: item.actor,
   repo: item.repo,
   pullTitle: item.payload.pull_request.title,
   pullURL: item.payload.pull_request.html_url,
   status: item.payload.pull_request.state,
   merged: item.payload.pull_request.merged}
  ))
  return filtered;
}

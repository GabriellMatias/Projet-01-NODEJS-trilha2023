export function buildRoutePath(path){
  const routeParametersRegex = /:([aA-zZ]+)/g

  const pathWithParams = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9\-_]+)")

  const pathRegex = new RegExp(`^${pathWithParams}(?<Query>\\?(.*))?$`)


  return pathRegex
}
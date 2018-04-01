import { matchRoutes } from 'react-router-config';
import { RouteProps } from 'react-router-dom';

export const loadGetInitialProps = async (
  pathname: string,
  routes: RouteProps[],
) => {
  const match:any = matchRoutes(routes, pathname);

  const promises: Promise<any>[] = match.map(({ route }) => {
    return (route.component as any).preload
      ? (route.component as any).preload().then(
          comp => comp.getInitialProps
            ? comp.getInitialProps() : Promise.resolve(null)
      )
      : (route.component as any).getInitialProps && (route.component as any).getInitialProps()
  });

  return {
    match: match && match[0] && match[0].match,
    initialProps: (await Promise.all(promises))[0]
  }
};
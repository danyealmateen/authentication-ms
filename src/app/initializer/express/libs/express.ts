export default function createServer({
  app,
  logger,
  json,
  urlencoded,
  cors,
  compression,
  helmet,
}) {
  return Object.freeze({ server });

  function server({ hostname, port, routes }) {
    app.use(helmet());
    app.options('*', cors({ credentials: true, origin: true }));
    app.use(cors());
    app.use(compression());
    app.use(json());
    app.use(urlencoded({ extended: true }));

    app.use((req, res, next) => {
      logger.info(
        `[EXPRESS] Connection recieved: ${req.ip}:${req.path}:${req.method}`
      );
      next();
    });

    for (let route of routes) {
      app[route.method](`${route.path}`, route.component);
    }

    app.listen(port, hostname, () => {
      logger.info(`[EXPRESS] Server running at http://${hostname}:${port}`);
      return;
    });
  }
}

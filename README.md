# node-xvfb-ts

Easily start and stop an X Virtual Frame Buffer from your node apps and typescript.

-----

## Usage

```typescript
import { Xvfb } from 'xvfb-ts';
const xvfb = new Xvfb();

await xvfb.start();

// code that uses the virtual frame buffer here

await xvfb.stop();
// the Xvfb is stopped
```

The Xvfb constructor takes four options:

* `displayNum` - the X display to use, defaults to the lowest unused display number >= 99 if `reuse` is false or 99 if `reuse` is true.
* `reuse` - whether to reuse an existing Xvfb instance if it already exists on the X display referenced by displayNum.
* `timeout` - number of milliseconds to wait when starting Xvfb before assuming it failed to start, defaults to 500.
* `silent` - don't pipe Xvfb stderr to the process's stderr.
* `xvfb_args` - Extra arguments to pass to `Xvfb`.

### Thanks to

* [Rob--W](https://github.com/Rob--W) for [xvfb](https://github.com/Rob--W/node-xvfb)

# polling-machine
> A easy way to use polling

- Promise
- ES6 Class

So you might need to use Babel alongside with it.

## Installation

```
npm install -S polling-machine
```

## Usage

#### 1. create new instance
```javascript
    const pollingMachine = new PollingMachine(aPromiseMethod, arg1, arg2, /* and so on */)
```

#### 2. add event listener
```javascript
    // event name must be one of 'message' and 'error'
    pollingMachine.on('message', res => /* something to do with response */)
    pollingMachine.on('error', err => /* something to do with error */)
```

#### 3. start polling
```javascript
    pollingMachine.start() // default time gap is 5000ms,
    // or
    pollingMachine.start(10000)
```

#### 4. stop polling
```javascript
    pollingMachine.stop()
```

#### 5. restart polling
```javascript
    pollingMachine.stop() // you need to stop polling before restart it, or an error will be thrown.
    pollingMachine.start()
```

## License
[MIT](http://opensource.org/licenses/MIT)
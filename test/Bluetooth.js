//初始化蓝牙
function DV_initialize(initializeResult,params){
	
	bluetoothle.initialize(initializeResult, params);
	
}

//扫描蓝牙设备
function DV_startScan(startScanSuccess,startScanError,params){
	
	bluetoothle.startScan(startScanSuccess, startScanError, params);
	
}

//停止扫描设备
function DV_stopScan(stopScanSuccess,stopScanError){
	
	bluetoothle.stopScan(stopScanSuccess, stopScanError);
	
}

//连接蓝牙设备
function DV_connect(connectSuccess,connectError,params){
	
	bluetoothle.connect(connectSuccess, connectError, params);
	
}

//读取服务和特征
function DV_discover(discoverSuccess,discoverError,params){
	
	bluetoothle.discover(discoverSuccess, discoverError, params);
	
}

//设置蓝牙监听
function DV_subscribe(subscribeSuccess,subscribeError,params){
	
	bluetoothle.subscribe(subscribeSuccess, subscribeError, params);
	
}

//是否初始化适配器
function DV_isInitialized(){
	
	return bluetoothle.isInitialized(function(status){
		
		return status;
		
	});
	
}

//适配器是否启用
function DV_isEnabled(){
	
	return bluetoothle.isEnabled(function(status){
		
		return status;
		
	});
	
}

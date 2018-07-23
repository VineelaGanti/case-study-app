/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "e990cb5d354ba15d5cc2";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client-entry.js":
/*!*************************!*\
  !*** ./client-entry.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./src/ui-core/index */ "./src/ui-core/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)({
    staticData: {},
    job: {
        byId: {}
    }
}); // Unpublished Work (c) 2017 - 2018 Deere & Company

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./sass/main.scss":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./sass/main.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#app-mount {\n  background-size: 100px;\n  height: 100px;\n  left: calc(50% - 50px);\n  position: absolute;\n  top: calc(50% - 50px);\n  width: 100px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/addStyles.js":
/*!************************************************!*\
  !*** ./node_modules/style-loader/addStyles.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(/*! ./fixUrls */ "./node_modules/style-loader/fixUrls.js");

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/fixUrls.js":
/*!**********************************************!*\
  !*** ./node_modules/style-loader/fixUrls.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./sass/main.scss":
/*!************************!*\
  !*** ./sass/main.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./sass/main.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../node_modules/style-loader/addStyles.js */ "./node_modules/style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./sass/main.scss", function() {
			var newContent = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./main.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./sass/main.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/ui-core/Data/RenderFromJson.js":
/*!********************************************!*\
  !*** ./src/ui-core/Data/RenderFromJson.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var data = {
    "CatalogEntryView": [{
        "CustomerReview": [{
            "Con": [{
                "RatableAttributes": [{
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "4"
                }, {
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "1"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "1"
                }],
                "datePosted": "Mon Mar 11 13:13:55 UTC 2013",
                "overallRating": "1",
                "review": "Less than 2 months after purchase it completely stopped working. First it wouldn't detect the pitcher when trying to blend a significant amount, a couple weeks later it wouldn't detect the single serve cup. ",
                "reviewKey": "b326b0d6-e6ae-4ec5-8080-720f0ad741af",
                "screenName": "New York",
                "title": "Very unhappy"
            }],
            "ConsolidatedRatableAttributes": [{
                "description": "Quality",
                "name": "QUALITY",
                "value": "4"
            }, {
                "description": "Easy to Use",
                "name": "EASY_TO_USE",
                "value": "4.5"
            }, {
                "description": "Value",
                "name": "VALUE",
                "value": "3.5"
            }],
            "Pro": [{
                "RatableAttributes": [{
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "datePosted": "Thu Apr 18 19:42:19 UTC 2013",
                "overallRating": "5",
                "review": "This blender works amazingly, and blends within seconds.  The single serve cups also work really well for smoothies or protein shakes!",
                "reviewKey": "d602bcdf-53be-4769-94da-3b3fd2517d21",
                "screenName": "Eric",
                "title": "Fantastic Blender"
            }],
            "Reviews": [{
                "RatableAttributes": [{
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "4"
                }, {
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "1"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "1"
                }],
                "city": "NYC",
                "customerId": "110657105",
                "datePosted": "Mon Mar 11 13:13:55 UTC 2013",
                "helpfulVotes": "39",
                "overallRating": "1",
                "review": "Less than 2 months after purchase it completely stopped working. First it wouldn't detect the pitcher when trying to blend a significant amount, a couple weeks later it wouldn't detect the single serve cup. ",
                "reviewKey": "b326b0d6-e6ae-4ec5-8080-720f0ad741af",
                "screenName": "New York",
                "state": "NY",
                "title": "Very unhappy",
                "totalComments": "0",
                "totalVotes": "52"
            }, {
                "Comments": [{
                    "city": "",
                    "commentKey": "CommentKey:ffcefb66-381a-4985-b869-9fcfdd26e7cc",
                    "commentText": "Separating the men from the boys,  separating the amateurs from the professionals when it comes to blenders, when you revealed to us that, -It doesn&#x27;t pulverize seeds-.I really need a good blender, but there is No way that I would buy this blender now. Thank you so much, Jon",
                    "postedDate": "Thu Oct 10 04:17:50 UTC 2013",
                    "screenName": "JON",
                    "userKey": "118863321",
                    "userTier": "Trusted"
                }],
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "2"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "3"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "2"
                }],
                "city": "Idaho Falls",
                "customerId": "116317693",
                "datePosted": "Sun Sep 01 03:18:11 UTC 2013",
                "helpfulVotes": "16",
                "overallRating": "2",
                "review": "This blender is not superior to other smoothie blenders, It doesn't pulverize seeds and leaves green smoothies chunky with a lot of pulp. The single serve concept is amazing, however, my single serve cup began to break right from the start. The prongs became chipped because of the difficulty of screwing it in and out of the base. It won't blend for more than a minute without smelling like burned rubber. While the single serve seemed to blend more smoothly, it didn't hold much, especially when adding ice. I was very disappointed and so I returned it,",
                "reviewKey": "399853f3-4451-40a8-bcd6-bda2d814d9f4",
                "screenName": "London",
                "state": "ID",
                "title": "Very Disappointed",
                "totalComments": "1",
                "totalVotes": "21"
            }, {
                "RatableAttributes": [{
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "city": "Oakland",
                "customerId": "100025104",
                "datePosted": "Thu Apr 18 19:42:19 UTC 2013",
                "helpfulVotes": "10",
                "overallRating": "5",
                "review": "This blender works amazingly, and blends within seconds.  The single serve cups also work really well for smoothies or protein shakes!",
                "reviewKey": "d602bcdf-53be-4769-94da-3b3fd2517d21",
                "screenName": "Eric",
                "state": "CA",
                "title": "Fantastic Blender",
                "totalComments": "0",
                "totalVotes": "10"
            }, {
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "city": "Cambridge",
                "customerId": "172227",
                "datePosted": "Sat Jan 18 01:20:36 UTC 2014",
                "helpfulVotes": "9",
                "overallRating": "5",
                "review": "I am blown away by this blender. It obliterates ice and frozen fruit - and blends fresh fruits to smooth perfection. It even makes quick work of fresh ginger and tough greens. I did a ton of research before settling on the Ninja. This was a splurge for me - and I spent the extra money to get the single serve cups, thinking I'd take my smoothie to work every morning. But my husband is totally hooked on smoothies now too, so the big pitcher is getting regular use. Tried it out for margaritas tonight... half a lime, half a lemon, half an orange with tequila, honey and ice... unbelievably good. Haven't tried it for soup or sauce yet, but can hardly wait.\n\nI'm impressed by features such as the suction cup feet, the snap-seal lid, and the sensor that prevents the machine from being turned on without the top in place. It cleans up nicely too. \n\nBottom line: I can't stop raving about this thing and have recommended it to all my friends and family.",
                "reviewKey": "d8e9ac59-6c3a-47be-8b87-f912715ccd18",
                "screenName": "E",
                "state": "MA",
                "title": "Couldn't be happier",
                "totalComments": "0",
                "totalVotes": "9"
            }, {
                "Comments": [{
                    "city": "",
                    "commentKey": "CommentKey:a5b92fc8-ec2a-4772-b4ea-3cf4d473015b",
                    "commentText": "THANK YOU, THANK YOU&#x21;&#x21;&#x21;&#x21;&#x21; YOU JUST GAVE ME THE BEST REASON TO -- NOT BUY -- THIS THING &#x21; THANK YOU, JON",
                    "postedDate": "Thu Oct 10 03:44:47 UTC 2013",
                    "screenName": "JON",
                    "userKey": "118863321",
                    "userTier": "Trusted"
                }],
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "1"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "1"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "1"
                }],
                "city": "new york",
                "customerId": "116426870",
                "datePosted": "Thu Jun 06 04:49:37 UTC 2013",
                "helpfulVotes": "38",
                "overallRating": "1",
                "review": " Upon using this blender  it turns out that the food gets into a deep hole at the bottom of the blade assembly , which fits on top of the rotating spindle, which cannot be cleaned.  No amount of rinsing or dish washer washing can get to it. A special thin and long brush would be required. Such food deposits can quickly become a place for bacteria growth and accumulate soap from dishwasher etc. A radical design change and going back to the drawing board is required, which Ninja would be unwilling to do.  Very poor and harmful product",
                "reviewKey": "49add669-1256-4894-9fce-9e0464342887",
                "screenName": "gourmet",
                "state": "NY",
                "title": "bacteria hazard",
                "totalComments": "1",
                "totalVotes": "69"
            }, {
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "city": "Wilmington ",
                "customerId": "115016455",
                "datePosted": "Sun Mar 16 13:54:36 UTC 2014",
                "helpfulVotes": "5",
                "overallRating": "5",
                "review": "Right out of the box I love this thing. You have to read the instructions: it indicates you must pulse several times THEN blend in order to get the smooth consistency. I'm going now to google soups to make. I'll add on to my review once I've tried more stuff. I know some folks had problems, I can say with total confidence that Ninja backs up what they make. I have a vacuum, steamer and iron and I broke the vacuum and they still fixed it for free. Easy peasy. Be sure to register your purchase. Peace. ",
                "reviewKey": "bf2283a9-37a1-46e2-b9b4-3edb757d5375",
                "screenName": "Sandra",
                "state": "DE",
                "title": "Great Blender",
                "totalComments": "0",
                "totalVotes": "5"
            }, {
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "city": "Tucson",
                "customerId": "119946555",
                "datePosted": "Thu Jan 30 18:50:22 UTC 2014",
                "helpfulVotes": "6",
                "overallRating": "5",
                "review": "My daughter received this Ninja blender and she absolutely loves it. My grandson has Autisim and has very sensitive taste buds. With the Ninja my daughter is able to puree his homemade soups, &amp; refried beans. Life is a little easier for my daughter &amp; him. She is in heaven. \n",
                "reviewKey": "7c7ef8c0-e227-45a5-86cd-c29adeb0bd2a",
                "screenName": "Flora",
                "state": "AZ",
                "title": "Ninja Blender",
                "totalComments": "0",
                "totalVotes": "7"
            }, {
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "4"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "city": "Minneapolis",
                "customerId": "109690154",
                "datePosted": "Sun Jan 12 17:41:43 UTC 2014",
                "helpfulVotes": "4",
                "overallRating": "5",
                "review": "I have to assume that the negative reviewers received an unfortunate &quot;lemon&quot; blender... that, or they didn't read the instruction manual, because I love my Ninja and definitely recommend it.\n\nI've had this blender for over a year and it still works as wonderfully as the day I bought it. I use it primarily for making smoothies, everything from green monsters to peanut butter protein shakes to frozen fruit &amp; yogurt smoothies with chia seeds on top.\n\nIt's like having Jamba Juice in my kitchen, but without the long line of snap-chatting teenagers.\n\nI frequently use the to-go cups to blend and take with me in the car. If you are in the camp lamenting that it doesn't hold enough, you probably also expect that once blended, it will be as full as you originally (over)stuffed it.\n\nRespect the max fill line, people, or use the full-size blender if you are going for NYC Big Gulp size.\n\nI will say, that if you are looking to seriously juice, this is not the blender for you. \n\nIt might take a little experimentation to get the right ratio of liquid to solid\/frozen for a perfectly smooth blend, but once you figure out what works for you, it's easy!",
                "reviewKey": "9e0322d2-256e-46a5-80dc-b4468e58359b",
                "screenName": "Kari",
                "state": "MN",
                "title": "Love this blender!",
                "totalComments": "0",
                "totalVotes": "4"
            }, {
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "5"
                }],
                "city": "Houston",
                "customerId": "116412794",
                "datePosted": "Wed Jun 05 14:26:21 UTC 2013",
                "helpfulVotes": "5",
                "overallRating": "5",
                "review": "[...]\nAll the parts are well made and good quality. The only thing that seems a little flimsy would be the drinking tops for the single serve cups, but those don't even matter because all you are doing is drinking from the tops.  All the rest of the machine is top notch.\n\nThis blender is powerful, quiet and very easy to clean.   \n\n[...]\nYou will not regret buying this machine.  ",
                "reviewKey": "4cc67e87-6754-4cab-8eb7-fb3bd738c16c",
                "screenName": "Te-Ann",
                "state": "TX",
                "title": "LOVE LOVE LOVE!!!!",
                "totalComments": "0",
                "totalVotes": "6"
            }, {
                "RatableAttributes": [{
                    "description": "quality",
                    "name": "QUALITY",
                    "value": "5"
                }, {
                    "description": "easy_to_use",
                    "name": "EASY_TO_USE",
                    "value": "5"
                }, {
                    "description": "value",
                    "name": "VALUE",
                    "value": "4"
                }],
                "city": "CENTREVILLE",
                "customerId": "102170259",
                "datePosted": "Thu Jan 30 05:33:15 UTC 2014",
                "helpfulVotes": "3",
                "overallRating": "5",
                "review": "I'm not sure why there are so many negative reviews about this blender on Target's website, but it's a great blender.  The first blender I've own that actually crushes the ice completely! Perfect for shakes!",
                "reviewKey": "3e810dba-638f-4146-aee8-190a741d86d5",
                "screenName": "SL",
                "state": "VA",
                "title": "Fantastic blender!!",
                "totalComments": "0",
                "totalVotes": "3"
            }],
            "consolidatedOverallRating": "4",
            "totalPages": "2",
            "totalReviews": "14"
        }],
        "DPCI": "072-04-1840",
        "Images": [{
            "AlternateImages": [{
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt01"
            }, {
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt02"
            }, {
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt03"
            }, {
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt04"
            }, {
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt05"
            }, {
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt06"
            }, {
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt07"
            }],
            "PrimaryImage": [{
                "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758"
            }],

            "imageCount": "8",
            "source": "internal"
        }],
        "ItemDescription": [{
            "features": ["<strong>Wattage Output:<\/strong> 1100 Watts", "<strong>Number of Speeds:<\/strong> 3 ", "<strong>Capacity (volume):<\/strong> 72.0 Oz.", "<strong>Appliance Capabilities:<\/strong> Blends", "<strong>Includes:<\/strong> Travel Lid", "<strong>Material:<\/strong> Plastic", "<strong>Finish:<\/strong> Painted", "<strong>Metal Finish:<\/strong> Chrome", "<strong>Safety and Security Features:<\/strong> Non-Slip Base", "<strong>Care and Cleaning:<\/strong> Easy-To-Clean, Dishwasher Safe Parts"]
        }],
        "Offers": [{
            "OfferPrice": [{
                "currencyCode": "USD",
                "formattedPriceValue": "$139.99",
                "priceQualifier": "Online Price",
                "priceValue": "13999"
            }]
        }],
        "POBoxProhibited": "We regret that this item cannot be shipped to PO Boxes.",
        "PackageDimension": [{
            "name": "length",
            "unit": "IN",
            "value": "17.4"
        }, {
            "name": "width",
            "unit": "IN",
            "value": "12.4"
        }, {
            "name": "height",
            "unit": "IN",
            "value": "9.9"
        }, {
            "name": "weight",
            "unit": "LB",
            "value": "10.85"
        }],
        "Promotions": [{
            "Description": [{
                "legalDisclaimer": "Offer available online only. Offer applies to purchases of $50 or more of eligible items across all categories. Look for the &quot;SPEND $50: SHIPS FREE&quot; logo on eligible items. Some exclusions apply. Items that are not eligible are subject to shipping charges. $50 purchase is based on eligible merchandise subtotal. Items that are not eligible, GiftCards, e-GiftCards, gift wrap, tax and shipping and handling charges will not be included in determining merchandise subtotal. Offer valid for orders shipping within the 48 contiguous states, as well as APO\/FPO and for Standard and To the Door shipping methods only. Not valid on previous orders.",
                "shortDescription": "SPEND $50, GET FREE SHIPPING"
            }],
            "endDate": "2014-05-25 06:59:00.001",
            "promotionIdentifier": "10736506",
            "promotionType": "Buy catalog entries from category X, get shipping at a fixed price",
            "startDate": "2014-05-18 07:00:00.001"
        }, {
            "Description": [{
                "legalDisclaimer": "Receive a $25 gift card when you buy a Ninja Professional Blender with single serve blending cups or a Ninja MEGA Kitchen System. Not valid on previous orders. On your order summary, the item subtotal will reflect the price of the qualifying item plus the amount of the free gift card, followed by a discount given for the amount of the free gift card. &nbsp;Your price on the order summary will be the price of the qualifying item (the total charges for the qualifying item and gift card). &nbsp;Your account will actually be charged the amount of the qualifying item reduced by the amount of the gift card, and a separate charge for the amount of the gift card. The gift card will be sent to the same address as your order and will ship separately. If you want to return the item you purchased to a Target Store, you may either keep the gift card and just return the qualifying item (you will be refunded the amount of the qualifying item reduced by the amount of the gift card), or you can return the qualifying item and the gift card &nbsp;for a full refund using the online receipt. If you return the item you purchased by mail, keep the gift card; you will be refunded the amount of the qualifying item reduced by the amount of the gift card. Offer expires 05\/24\/14 at 11:59pm PST.",
                "shortDescription": "$25 gift card with purchase of a select Ninja Blender"
            }],
            "endDate": "2014-05-25 06:59:00.001",
            "promotionIdentifier": "10730501",
            "promotionType": "Multiple Items Free Gift",
            "startDate": "2014-05-11 07:00:00.001"
        }],
        "ReturnPolicy": [{
            "ReturnPolicyDetails": [{
                "guestMessage": "View our return policy",
                "policyDays": "100",
                "user": "Regular Guest"
            }, {
                "guestMessage": "View our return policy",
                "policyDays": "120",
                "user": "Best Guest"
            }],
            "legalCopy": "refund\/exchange policy<br\/><br\/><p style=\"font-size:13px;\">Most unopened items in new condition returned within 90 days will receive a refund or exchange. Some items have a modified return policy that is less than 90 days.&nbsp;Those items will either show a \"return by\" date or \"return within\" day range under the item on your receipt or packing slip and in the \"Item details, shipping\" tab if purchased on Target.com. Items that are opened or damaged or do not have a packing slip or receipt may be denied a refund or exchange. All bundled items must be returned with all components for a full refund. Bundle components may not all have the same return policy; please check your packing slip for details.&nbsp; Some items, such as gift cards, digital items&nbsp;are never returnable.&nbsp;<br \/><br \/>See the <a href=\"http:\/\/www.target.com\/HelpContent?help=\/sites\/html\/TargetOnline\/help\/returns_and_refunds\/returns_and_refunds.html\">Target return policy<\/a> for complete information.<\/p><br\/>"
        }],
        "UPC": "622356532099",
        "applyCouponLink": "false",
        "buyable": "true",
        "callOutMsg": "FREE $25 GIFT CARD",
        "catEntryId": "205273068",
        "classId": "04",
        "department": "072",
        "eligibleFor": "ADD_TO_CART",
        "inventoryCode": "0",
        "inventoryStatus": "Online",
        "itemId": "1840",
        "itemType": "ItemBean",
        "manufacturer": "Euro Pro",
        "manufacturerPartNumber": "BL660",
        "packageQuantity": "null ",
        "partNumber": "14263758",
        "purchasingChannel": "Sold Online + in Stores",
        "purchasingChannelCode": "0",
        "shortDescription": "For the first time EVER - you get the same professional performance power in the Single Serve as well as the XL 72 oz pitcher! The Ninja\u2122 Professional Blender with Single Serve Blending Cups allow you to crush ice into snow, blend whole fruits and vegetables into nutritious beverages, and create resort style blended drinks! Full size blender performance now in individual cups.",
        "title": "Ninja\u2122 Professional Blender with Single Serve Blending Cups",
        "webclass": "Small Appliances"
    }]
};

exports.default = data;
module.exports = exports["default"];

/***/ }),

/***/ "./src/ui-core/case-study-provider.js":
/*!********************************************!*\
  !*** ./src/ui-core/case-study-provider.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CaseStudyProvider;

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appContainer = __webpack_require__(/*! ./containers/app-container */ "./src/ui-core/containers/app-container.js");

var _appContainer2 = _interopRequireDefault(_appContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Unpublished Work (c) 2017 Deere & Company

function CaseStudyProvider(props) {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: props.store },
        _react2.default.createElement(_appContainer2.default, props)
    );
}

CaseStudyProvider.propTypes = {
    store: _propTypes2.default.object.isRequired
};
module.exports = exports['default'];

/***/ }),

/***/ "./src/ui-core/components/app.js":
/*!***************************************!*\
  !*** ./src/ui-core/components/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ "babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ "babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ "babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ "babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ "babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

__webpack_require__(/*! ../../../sass/main.scss */ "./sass/main.scss");

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _RenderFromJson = __webpack_require__(/*! ../Data/RenderFromJson */ "./src/ui-core/Data/RenderFromJson.js");

var _RenderFromJson2 = _interopRequireDefault(_RenderFromJson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);

    function App() {
        (0, _classCallCheck3.default)(this, App);
        return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }

    (0, _createClass3.default)(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h1',
                    null,
                    'Hello React'
                )
            );
        }
    }]);
    return App;
}(_react2.default.Component);

exports.default = App;
module.exports = exports['default'];

/***/ }),

/***/ "./src/ui-core/constants/ajax-status.js":
/*!**********************************************!*\
  !*** ./src/ui-core/constants/ajax-status.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Unpublished Work (c) 2017 Deere & Company

var FETCHING = exports.FETCHING = 'ajaxStatus/fetching';
var ERRORED = exports.ERRORED = 'ajaxStatus/errored';
var UNFETCHED = exports.UNFETCHED = 'ajaxStatus/unfetched';
var FETCHED = exports.FETCHED = 'ajaxStatus/fetched';

/***/ }),

/***/ "./src/ui-core/containers/app-container.js":
/*!*************************************************!*\
  !*** ./src/ui-core/containers/app-container.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = __webpack_require__(/*! react-redux */ "react-redux");

var _app = __webpack_require__(/*! ../components/app */ "./src/ui-core/components/app.js");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapStateToProps(state) {
    return state;
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_app2.default);
module.exports = exports['default'];

/***/ }),

/***/ "./src/ui-core/dux/index.js":
/*!**********************************!*\
  !*** ./src/ui-core/dux/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (state, action) {
    return appReducer(state, action);
};

var _redux = __webpack_require__(/*! redux */ "redux");

var _catalogView = __webpack_require__(/*! ../dux/static-data/catalog-view */ "./src/ui-core/dux/static-data/catalog-view.js");

var _catalogView2 = _interopRequireDefault(_catalogView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appReducer = (0, _redux.combineReducers)({
    staticData: _catalogView2.default
});

module.exports = exports['default'];

/***/ }),

/***/ "./src/ui-core/dux/static-data/catalog-view.js":
/*!*****************************************************!*\
  !*** ./src/ui-core/dux/static-data/catalog-view.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.actionCreators = undefined;

var _redux = __webpack_require__(/*! redux */ "redux");

var _ajaxStatus = __webpack_require__(/*! ../../constants/ajax-status */ "./src/ui-core/constants/ajax-status.js");

var UPDATE_STATUS = 'catalogData/update';
var SET = 'catalogData/set';

function updateStatus(newStatus) {
    return {
        type: UPDATE_STATUS,
        newStatus: newStatus
    };
}

function set(catalogDataArray) {
    return {
        type: SET,
        catalogData: catalogDataArray
    };
}

var actionCreators = {
    updateStatus: updateStatus,
    set: set
};

var DEFAULT_STATE = {};

function applyById() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments[1];

    if (action.type === SET) {
        // Do something here
    }

    return state;
}

function applyStatus() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ajaxStatus.UNFETCHED;
    var action = arguments[1];

    if (action.type === UPDATE_STATUS) {
        return action.newStatus;
    }

    return state;
}

exports.default = (0, _redux.combineReducers)({
    byId: applyById,
    status: applyStatus
});
exports.actionCreators = actionCreators;

/***/ }),

/***/ "./src/ui-core/index.js":
/*!******************************!*\
  !*** ./src/ui-core/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ "babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _caseStudyProvider = __webpack_require__(/*! ./case-study-provider */ "./src/ui-core/case-study-provider.js");

var _caseStudyProvider2 = _interopRequireDefault(_caseStudyProvider);

var _initializeStore = __webpack_require__(/*! ./initialize-store */ "./src/ui-core/initialize-store.js");

var _initializeStore2 = _interopRequireDefault(_initializeStore);

var _fetchAllStaticDataAndInit = __webpack_require__(/*! ./thunks/fetch-all-static-data-and-init */ "./src/ui-core/thunks/fetch-all-static-data-and-init.js");

var _fetchAllStaticDataAndInit2 = _interopRequireDefault(_fetchAllStaticDataAndInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (initialState, props) {
    var store = (0, _initializeStore2.default)(initialState);
    var propsWithStore = (0, _assign2.default)({}, props, {
        store: store
    });

    // store.dispatch(fetchStaticDataAndInitState());

    var element = _react2.default.createElement(_caseStudyProvider2.default, propsWithStore);

    _reactDom2.default.render(element, document.getElementById('app-mount'));
};

module.exports = exports['default'];

/***/ }),

/***/ "./src/ui-core/initialize-store.js":
/*!*****************************************!*\
  !*** ./src/ui-core/initialize-store.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = initializeStore;

var _redux = __webpack_require__(/*! redux */ "redux");

var _reduxThunk = __webpack_require__(/*! redux-thunk */ "redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _dux = __webpack_require__(/*! ./dux */ "./src/ui-core/dux/index.js");

var _dux2 = _interopRequireDefault(_dux);

var _reduxDebounced = __webpack_require__(/*! redux-debounced */ "redux-debounced");

var _reduxDebounced2 = _interopRequireDefault(_reduxDebounced);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initializeStore(initialState) {
    var middleware = (0, _redux.applyMiddleware)((0, _reduxDebounced2.default)(), _reduxThunk2.default);
    var store = (0, _redux.createStore)(_dux2.default, initialState, middleware);

    return store;
}
module.exports = exports['default'];

/***/ }),

/***/ "./src/ui-core/thunks/fetch-all-static-data-and-init.js":
/*!**************************************************************!*\
  !*** ./src/ui-core/thunks/fetch-all-static-data-and-init.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {};
    // return (dispatch) => {
    //     return Promise.all([
    //         // dispatch(fetchAllData()),
    //     ]);
    // };
};

module.exports = exports["default"];

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi webpack/hot/only-dev-server babel-polyfill ./client-entry.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack/hot/only-dev-server */"webpack/hot/only-dev-server");
__webpack_require__(/*! babel-polyfill */"babel-polyfill");
module.exports = __webpack_require__(/*! ./client-entry.js */"./client-entry.js");


/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/assign" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/object/get-prototype-of":
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-prototype-of" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ "babel-runtime/helpers/createClass":
/*!****************************************************!*\
  !*** external "babel-runtime/helpers/createClass" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ "babel-runtime/helpers/inherits":
/*!*************************************************!*\
  !*** external "babel-runtime/helpers/inherits" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ "babel-runtime/helpers/possibleConstructorReturn":
/*!******************************************************************!*\
  !*** external "babel-runtime/helpers/possibleConstructorReturn" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-debounced":
/*!**********************************!*\
  !*** external "redux-debounced" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-debounced");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "webpack/hot/only-dev-server":
/*!**********************************************!*\
  !*** external "webpack/hot/only-dev-server" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack/hot/only-dev-server");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map
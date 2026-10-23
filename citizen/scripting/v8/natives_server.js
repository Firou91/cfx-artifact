const _i = Citizen.pointerValueInt();
const _f = Citizen.pointerValueFloat();
const _v = Citizen.pointerValueVector();
const _r = Citizen.returnResultAnyway();
const _ri = Citizen.resultAsInteger();
const _rf = Citizen.resultAsFloat();
const _rl = Citizen.resultAsLong();
const _s = Citizen.resultAsString();
const _rv = Citizen.resultAsVector();
const _ro = Citizen.resultAsObject2();
const _in = Citizen.invokeNativeByHash;
const _ii = Citizen.pointerValueIntInitialized;
const _fi = Citizen.pointerValueFloatInitialized;
function _ch(hash) {
	if (typeof hash === 'string') {
		return global.GetHashKey(hash);
	}

	return hash;
}

function _obj(obj) {
	const s = msgpack_pack(obj);
	return [s, s.length];
}

function _ts(num) {
	if (num === 0 || num === null || num === undefined || num === false) { // workaround for users calling string parameters with '0', also nil being translated
		return null;
	}
	if (ArrayBuffer.isView(num) || num instanceof ArrayBuffer) { // these are handled as strings internally
		return num;
	}
	return num.toString();
}
function _fv(flt) {
	return (flt === 0.0) ? flt : (flt + 0.0000001);
}

function _mfr(fn) {
	return Citizen.getRefFunction(fn);
}

const _ENV = null;

/**
 * Adds a rectangular blip for the specified coordinates/area.
 * It is recommended to use [SET_BLIP_ROTATION](#\_0xF87683CDF73C3F6E) and [SET_BLIP_COLOUR](#\_0x03D7FB09E75D6B7E) to make the blip not rotate along with the camera.
 * By default, the blip will show as a *regular* blip with the specified color/sprite if it is outside of the minimap view.
 * (Native name is *likely* to actually be ADD_BLIP_FOR_AREA, but due to the usual reasons this can't be confirmed)
 * @param x The X coordinate of the center of the blip.
 * @param y The Y coordinate of the center of the blip.
 * @param z The Z coordinate of the center of the blip.
 * @param width The width of the blip.
 * @param height The height of the blip.
 * @return A handle to the blip.
 */
global.AddBlipForArea = function (x, y, z, width, height) {
	return _in(0x00000000, 0x6228f159, _fv(x), _fv(y), _fv(z), _fv(width), _fv(height), _r, _ri);
};
global.N_0xce5d0e5e315db238 = global.AddBlipForArea;

/**
 * Creates a blip for the specified coordinates. You can use `SET_BLIP_` natives to change the blip.
 * @param x The X coordinate to create the blip on.
 * @param y The Y coordinate.
 * @param z The Z coordinate.
 * @return A blip handle.
 */
global.AddBlipForCoord = function (x, y, z) {
	return _in(0x00000000, 0xc6f43d0e, _fv(x), _fv(y), _fv(z), _r, _ri);
};

/**
 * Create a blip that by default is red (enemy), you can use [SET_BLIP_AS_FRIENDLY](#\_0xC6F43D0E) to make it blue (friend).\
 * Can be used for objects, vehicles and peds.
 * Example of enemy:
 * ![enemy](https://i.imgur.com/LIizV6S.png)
 * Example of friend:
 * ![friend](https://i.imgur.com/XrCuvZP.png)
 * @param entity The entity handle to create the blip.
 * @return A blip handle.
 */
global.AddBlipForEntity = function (entity) {
	return _in(0x00000000, 0x30822554, entity, _r, _ri);
};

/**
 * Create a blip with a radius for the specified coordinates (it doesnt create the blip sprite, so you need to use [AddBlipCoords](#\_0xC6F43D0E))
 * Example image:
 * ![example](https://i.imgur.com/fDCmHVD.png)
 * @param posX The x position of the blip (you can also send a vector3 instead of the bulk coordinates)
 * @param posY The y position of the blip (you can also send a vector3 instead of the bulk coordinates)
 * @param posZ The z position of the blip (you can also send a vector3 instead of the bulk coordinates)
 * @param radius The number that defines the radius of the blip circle
 * @return The blip handle that can be manipulated with every `SetBlip` natives
 */
global.AddBlipForRadius = function (posX, posY, posZ, radius) {
	return _in(0x00000000, 0x4626756c, _fv(posX), _fv(posY), _fv(posZ), _fv(radius), _r, _ri);
};

/**
 * Adds a listener for Console Variable changes.
 * The function called expects to match the following signature:
 * ```ts
 * function ConVarChangeListener(conVarName: string, reserved: any);
 * ```
 * *   **conVarName**: The ConVar that changed.
 * *   **reserved**: Currently unused.
 * @param conVarFilter The Console Variable to listen for, this can be a pattern like "test:\*", or null for any
 * @param handler The handler function.
 * @return A cookie to remove the change handler.
 */
global.AddConvarChangeListener = function (conVarFilter, handler) {
	return _in(0x00000000, 0xab7f7241, _ts(conVarFilter), _mfr(handler), _r, _ri);
};

/**
 * Applies an Item from a PedDecorationCollection to a ped. These include tattoos and shirt decals.
 * collection - PedDecorationCollection filename hash
 * overlay - Item name hash
 * Example:
 * Entry inside "mpbeach_overlays.xml" -
 * <Item>
 * <uvPos x="0.500000" y="0.500000" />
 * <scale x="0.600000" y="0.500000" />
 * <rotation value="0.000000" />
 * <nameHash>FM_Hair_Fuzz</nameHash>
 * <txdHash>mp_hair_fuzz</txdHash>
 * <txtHash>mp_hair_fuzz</txtHash>
 * <zone>ZONE_HEAD</zone>
 * <type>TYPE_TATTOO</type>
 * <faction>FM</faction>
 * <garment>All</garment>
 * <gender>GENDER_DONTCARE</gender>
 * <award />
 * <awardLevel />
 * </Item>
 * Code:
 * PED::_0x5F5D1665E352A839(PLAYER::PLAYER_PED_ID(), MISC::GET_HASH_KEY("mpbeach_overlays"), MISC::GET_HASH_KEY("fm_hair_fuzz"))
 */
global.AddPedDecorationFromHashes = function (ped, collection, overlay) {
	return _in(0x00000000, 0x70559ac7, ped, _ch(collection), _ch(overlay));
};
global.ApplyPedOverlay = global.AddPedDecorationFromHashes;
global.SetPedDecoration = global.AddPedDecorationFromHashes;

/**
 * Adds a handler for changes to a state bag.
 * The function called expects to match the following signature:
 * ```ts
 * function StateBagChangeHandler(bagName: string, key: string, value: any, reserved: number, replicated: boolean);
 * ```
 * *   **bagName**: The internal bag ID for the state bag which changed. This is usually `player:Source`, `entity:NetID`
 * or `localEntity:Handle`.
 * *   **key**: The changed key.
 * *   **value**: The new value stored at key. The old value is still stored in the state bag at the time this callback executes.
 * *   **reserved**: Currently unused.
 * *   **replicated**: Whether the set is meant to be replicated.
 * At this time, the change handler can't opt to reject changes.
 * If bagName refers to an entity, use [GET_ENTITY_FROM_STATE_BAG_NAME](#\_0x4BDF1867) to get the entity handle
 * If bagName refers to a player, use [GET_PLAYER_FROM_STATE_BAG_NAME](#\_0xA56135E0) to get the player handle
 * @param keyFilter The key to check for, or null for no filter.
 * @param bagFilter The bag ID to check for such as `entity:65535`, or null for no filter.
 * @param handler The handler function.
 * @return A cookie to remove the change handler.
 */
global.AddStateBagChangeHandler = function (keyFilter, bagFilter, handler) {
	return _in(0x00000000, 0x5ba35aaf, _ts(keyFilter), _ts(bagFilter), _mfr(handler), _r, _ri);
};

/**
 * cpp
 * enum eApplyForceTypes {
 * APPLY_TYPE_FORCE = 0,
 * APPLY_TYPE_IMPULSE = 1,
 * APPLY_TYPE_EXTERNAL_FORCE = 2,
 * APPLY_TYPE_EXTERNAL_IMPULSE = 3,
 * APPLY_TYPE_TORQUE = 4,
 * APPLY_TYPE_ANGULAR_IMPULSE = 5
 * }
 * @param entity The entity handle
 * @param forceType The force type
 * @param x The x component of the force to apply
 * @param y The y component of the force to apply
 * @param z The z component of the force to apply
 * @param offX Offset from center of entity (X)
 * @param offY Offset from center of entity (Y)
 * @param offZ Offset from center of entity (Z)
 * @param nComponent Component of the entity to apply the force too. Only matters for breakable or articulated (ragdoll) physics. 0 means the root or parent component
 * @param bLocalForce Specifies whether the force vector passed in is in local or world coordinates. `true` means the force will get automatically transformed into world space before being applied
 * @param bLocalOffset Specifies whether the offset passed in is in local or world coordinates
 * @param bScaleByMass Specifies whether to scale the force by mass
 * @param bPlayAudio Specifies whether to play audio events related to the force being applied. The audio will depend on the entity type. Currently vehicles are the only entity types supported, and will play a suspension squeal depending on the magnitude of the force
 * @param bScaleByTimeWarp Specifies whether to scale the force by time warp. Default is `true`
 */
global.ApplyForceToEntity = function (entity, forceType, x, y, z, offX, offY, offZ, nComponent, bLocalForce, bLocalOffset, bScaleByMass, bPlayAudio, bScaleByTimeWarp) {
	return _in(0x00000000, 0xc1c0855a, entity, forceType, _fv(x), _fv(y), _fv(z), _fv(offX), _fv(offY), _fv(offZ), nComponent, bLocalForce, bLocalOffset, bScaleByMass, bPlayAudio, bScaleByTimeWarp);
};

/**
 * > This native is deprecated and may be removed in a future version. Use the [Tebex API](https://docs.tebex.io/) instead.
 * Returns whether or not the specified player has enough information to start a commerce session for.
 * @param playerSrc The player handle
 * @return True or false.
 */
global.CanPlayerStartCommerceSession = function (playerSrc) {
	return _in(0x00000000, 0x429461c3, _ts(playerSrc), _r);
};

/**
 * Cancels the currently executing event.
 */
global.CancelEvent = function () {
	return _in(0x00000000, 0xfa29d35d);
};

/**
 * CLEAR_PED_PROP
 * @param ped The ped handle.
 * @param propId The prop id you want to clear from the ped. Refer to [SET_PED_PROP_INDEX](#\_0x93376B65A266EB5F).
 */
global.ClearPedProp = function (ped, propId) {
	return _in(0x00000000, 0x2d23d743, ped, propId);
};

/**
 * CLEAR_PED_SECONDARY_TASK
 */
global.ClearPedSecondaryTask = function (ped) {
	return _in(0x00000000, 0xa635f451, ped);
};

/**
 * Clear a ped's tasks. Stop animations and other tasks created by scripts.
 * @param ped Ped id. Use PlayerPedId() for your own character.
 */
global.ClearPedTasks = function (ped) {
	return _in(0x00000000, 0xde3316ab, ped);
};

/**
 * Immediately stops the pedestrian from whatever it's doing. The difference between this and [CLEAR_PED_TASKS](#\_0xE1EF3C1216AFF2CD) is that this one teleports the ped but does not change the position of the ped.
 * @param ped Ped id.
 */
global.ClearPedTasksImmediately = function (ped) {
	return _in(0x00000000, 0xbc045625, ped);
};

/**
 * This executes at the same as speed as PLAYER::SET_PLAYER_WANTED_LEVEL(player, 0, false);
 * PLAYER::GET_PLAYER_WANTED_LEVEL(player); executes in less than half the time. Which means that it's worth first checking if the wanted level needs to be cleared before clearing. However, this is mostly about good code practice and can important in other situations. The difference in time in this example is negligible.
 */
global.ClearPlayerWantedLevel = function (player) {
	return _in(0x00000000, 0x54ea5bcc, _ts(player));
};

/**
 * Creates an object (prop) with the specified model at the specified position, offset on the Z axis by the radius of the object's model.
 * This object will initially be owned by the creating script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * @param modelHash The model to spawn.
 * @param x Spawn coordinate X component.
 * @param y Spawn coordinate Y component.
 * @param z Spawn coordinate Z component, 'ground level'.
 * @param isNetwork Whether to create a network object for the object. If false, the object exists only locally.
 * @param netMissionEntity Whether to register the object as pinned to the script host in the R\* network model.
 * @param doorFlag False to create a door archetype (archetype flag bit 26 set) as a door. Required to be set to true to create door models in network mode.
 * @return A script handle (fwScriptGuid index) for the object, or `0` if the object failed to be created.
 */
global.CreateObject = function (modelHash, x, y, z, isNetwork, netMissionEntity, doorFlag) {
	return _in(0x00000000, 0x2f7aa05c, _ch(modelHash), _fv(x), _fv(y), _fv(z), isNetwork, netMissionEntity, doorFlag, _r, _ri);
};

/**
 * Creates an object (prop) with the specified model centered at the specified position.
 * This object will initially be owned by the creating script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * @param modelHash The model to spawn.
 * @param x Spawn coordinate X component.
 * @param y Spawn coordinate Y component.
 * @param z Spawn coordinate Z component.
 * @param isNetwork Whether to create a network object for the object. If false, the object exists only locally.
 * @param netMissionEntity Whether to register the object as pinned to the script host in the R\* network model.
 * @param doorFlag False to create a door archetype (archetype flag bit 26 set) as a door. Required to be set to true to create door models in network mode.
 * @return A script handle (fwScriptGuid index) for the object, or `0` if the object failed to be created.
 */
global.CreateObjectNoOffset = function (modelHash, x, y, z, isNetwork, netMissionEntity, doorFlag) {
	return _in(0x00000000, 0x58040420, _ch(modelHash), _fv(x), _fv(y), _fv(z), isNetwork, netMissionEntity, doorFlag, _r, _ri);
};

/**
 * Creates a ped (biped character, pedestrian, actor) with the specified model at the specified position and heading.
 * This ped will initially be owned by the creating script as a mission entity, and the model should be loaded already
 * (e.g. using REQUEST_MODEL).
 * @param pedType Unused. Peds get set to CIVMALE/CIVFEMALE/etc. no matter the value specified.
 * @param modelHash The model of ped to spawn.
 * @param x Spawn coordinate X component.
 * @param y Spawn coordinate Y component.
 * @param z Spawn coordinate Z component.
 * @param heading Heading to face towards, in degrees.
 * @param isNetwork Whether to create a network object for the ped. If false, the ped exists only locally.
 * @param bScriptHostPed Whether to register the ped as pinned to the script host in the R\* network model.
 * @return A script handle (fwScriptGuid index) for the ped, or `0` if the ped failed to be created.
 */
global.CreatePed = function (pedType, modelHash, x, y, z, heading, isNetwork, bScriptHostPed) {
	return _in(0x00000000, 0x0389ef71, pedType, _ch(modelHash), _fv(x), _fv(y), _fv(z), _fv(heading), isNetwork, bScriptHostPed, _r, _ri);
};

/**
 * CREATE_PED_INSIDE_VEHICLE
 * @param pedType See [`CREATE_PED`](#\_0xD49F9B0955C367DE)
 */
global.CreatePedInsideVehicle = function (vehicle, pedType, modelHash, seat, isNetwork, bScriptHostPed) {
	return _in(0x00000000, 0x3000f092, vehicle, pedType, _ch(modelHash), seat, isNetwork, bScriptHostPed, _r, _ri);
};

/**
 * Creates a vehicle with the specified model at the specified position. This vehicle will initially be owned by the creating
 * script as a mission entity, and the model should be loaded already (e.g. using REQUEST_MODEL).
 * ```
 * NativeDB Added Parameter 8: BOOL p7
 * ```
 * @param modelHash The model of vehicle to spawn.
 * @param x Spawn coordinate X component.
 * @param y Spawn coordinate Y component.
 * @param z Spawn coordinate Z component.
 * @param heading Heading to face towards, in degrees.
 * @param isNetwork Whether to create a network object for the vehicle. If false, the vehicle exists only locally.
 * @param netMissionEntity Whether to register the vehicle as pinned to the script host in the R\* network model.
 * @return A script handle (fwScriptGuid index) for the vehicle, or `0` if the vehicle failed to be created.
 */
global.CreateVehicle = function (modelHash, x, y, z, heading, isNetwork, netMissionEntity) {
	return _in(0x00000000, 0xdd75460a, _ch(modelHash), _fv(x), _fv(y), _fv(z), _fv(heading), isNetwork, netMissionEntity, _r, _ri);
};

/**
 * Equivalent to CREATE_VEHICLE, but it uses 'server setter' logic (like the former CREATE_AUTOMOBILE) as a workaround for
 * reliability concerns regarding entity creation RPC.
 * Unlike CREATE_AUTOMOBILE, this supports other vehicle types as well.
 * @param modelHash The model of vehicle to spawn.
 * @param type The appropriate vehicle type for the model info. Can be one of `automobile`, `bike`, `boat`, `heli`, `plane`, `submarine`, `trailer`, and (potentially), `train`. This should be the same type as the `type` field in `vehicles.meta`.
 * @param x Spawn coordinate X component.
 * @param y Spawn coordinate Y component.
 * @param z Spawn coordinate Z component.
 * @param heading Heading to face towards, in degrees.
 * @return A script handle for the vehicle, or 0 if the vehicle failed to be created.
 */
global.CreateVehicleServerSetter = function (modelHash, type, x, y, z, heading) {
	return _in(0x00000000, 0x6ae51d4b, _ch(modelHash), _ts(type), _fv(x), _fv(y), _fv(z), _fv(heading), _r, _ri);
};

/**
 * Deletes the specified entity.
 * **NOTE**: For trains this will only work if called on the train engine, it will not work on its carriages.
 * @param entity The entity to delete.
 */
global.DeleteEntity = function (entity) {
	return _in(0x00000000, 0xfaa3d236, entity);
};

/**
 * DELETE_FUNCTION_REFERENCE
 */
global.DeleteFunctionReference = function (referenceIdentity) {
	return _in(0x00000000, 0x1e86f206, _ts(referenceIdentity));
};

/**
 * DELETE_RESOURCE_KVP
 * @param key The key to delete
 */
global.DeleteResourceKvp = function (key) {
	return _in(0x00000000, 0x7389b5df, _ts(key));
};

/**
 * Nonsynchronous [DELETE_RESOURCE_KVP](#\_0x7389B5DF) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key The key to delete
 */
global.DeleteResourceKvpNoSync = function (key) {
	return _in(0x00000000, 0x04152c90, _ts(key));
};

/**
 * Deletes the specified `entity` and any carriage its attached to, or that is attached to it.
 * @param entity The carriage to delete.
 */
global.DeleteTrain = function (entity) {
	return _in(0x00000000, 0x523ba3da, entity);
};

/**
 * DOES_BOAT_SINK_WHEN_WRECKED
 * @param vehicle The target vehicle.
 * @return Returns whether or not the boat sinks when wrecked.
 */
global.DoesBoatSinkWhenWrecked = function (vehicle) {
	return _in(0x00000000, 0x43f15989, vehicle, _r);
};

/**
 * DOES_ENTITY_EXIST
 */
global.DoesEntityExist = function (entity) {
	return _in(0x00000000, 0x3ac90869, entity, _r);
};

/**
 * Returns whether or not the player exists
 * @return True if the player exists, false otherwise
 */
global.DoesPlayerExist = function (playerSrc) {
	return _in(0x00000000, 0x12038599, _ts(playerSrc), _r);
};

/**
 * > This native is deprecated and may be removed in a future version. Use [`DOES_PLAYER_OWN_SKU_EXT`](#\_0xDEF0480B) instead.
 * Requests whether or not the player owns the specified SKU.
 * @param playerSrc The player handle
 * @param skuId The ID of the SKU.
 * @return A boolean.
 */
global.DoesPlayerOwnSku = function (playerSrc, skuId) {
	return _in(0x00000000, 0x167aba27, _ts(playerSrc), skuId, _r);
};

/**
 * Requests whether or not the player owns the specified package.
 * @param playerSrc The player handle
 * @param skuId The package ID on Tebex.
 * @return A boolean.
 */
global.DoesPlayerOwnSkuExt = function (playerSrc, skuId) {
	return _in(0x00000000, 0xdef0480b, _ts(playerSrc), skuId, _r);
};

/**
 * DOES_TRAIN_STOP_AT_STATIONS
 * @param train The train handle
 * @return True if the train stops at stations. False otherwise
 */
global.DoesTrainStopAtStations = function (train) {
	return _in(0x00000000, 0x77cc80dc, train, _r);
};

/**
 * DROP_PLAYER
 */
global.DropPlayer = function (playerSrc, reason) {
	return _in(0x00000000, 0xba0613e1, _ts(playerSrc), _ts(reason));
};

/**
 * DUPLICATE_FUNCTION_REFERENCE
 */
global.DuplicateFunctionReference = function (referenceIdentity) {
	return _in(0x00000000, 0xf4e2079d, _ts(referenceIdentity), _r, _s);
};

/**
 * ENABLE_ENHANCED_HOST_SUPPORT
 */
global.EnableEnhancedHostSupport = function (enabled) {
	return _in(0x00000000, 0xf97b1c93, enabled);
};

/**
 * END_FIND_KVP
 * @param handle The KVP find handle returned from [START_FIND_KVP](#\_0xDD379006)
 * @return None.
 */
global.EndFindKvp = function (handle) {
	return _in(0x00000000, 0xb3210203, handle);
};

/**
 * Internal function for ensuring an entity has a state bag.
 */
global.EnsureEntityStateBag = function (entity) {
	return _in(0x00000000, 0x3bb78f05, entity);
};

/**
 * Depending on your use case you may need to use `add_acl resource.<your_resource_name> command.<command_name> allow` to use this native in your resource.
 */
global.ExecuteCommand = function (commandString) {
	return _in(0x00000000, 0x561c060b, _ts(commandString));
};

/**
 * FIND_KVP
 * @param handle The KVP find handle returned from [START_FIND_KVP](#\_0xDD379006)
 * @return None.
 */
global.FindKvp = function (handle) {
	return _in(0x00000000, 0xbd7bebc5, handle, _r, _s);
};

/**
 * FLAG_SERVER_AS_PRIVATE
 */
global.FlagServerAsPrivate = function (private_) {
	return _in(0x00000000, 0x13b6855d, private_);
};

/**
 * Nonsynchronous operations will not wait for a disk/filesystem flush before returning from a write or delete call. They will be much faster than their synchronous counterparts (e.g., bulk operations), however, a system crash may lose the data to some recent operations.
 * This native ensures all `_NO_SYNC` operations are synchronized with the disk/filesystem.
 */
global.FlushResourceKvp = function () {
	return _in(0x00000000, 0xe27c97a0);
};

/**
 * An internal function for converting a stack trace object to a string.
 */
global.FormatStackTrace = function (traceData) {
	return _in(0x00000000, 0xd70c3bca, ...(_obj(traceData)), _r, _s);
};

/**
 * Freezes or unfreezes an entity preventing its coordinates to change by the player if set to `true`. You can still change the entity position using [`SET_ENTITY_COORDS`](#\_0x06843DA7060A026B).
 * @param entity The entity to freeze/unfreeze.
 * @param toggle Freeze or unfreeze entity.
 */
global.FreezeEntityPosition = function (entity, toggle) {
	return _in(0x00000000, 0x65c16d57, entity, toggle);
};

/**
 * GET_AIR_DRAG_MULTIPLIER_FOR_PLAYERS_VEHICLE
 * @param playerSrc The player handle
 */
global.GetAirDragMultiplierForPlayersVehicle = function (playerSrc) {
	return _in(0x00000000, 0x62fc38d0, _ts(playerSrc), _r, _rf);
};

/**
 * Returns all object handles known to the server.
 * The data returned adheres to the following layout:
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of object handles.
 */
global.GetAllObjects = function () {
	return _in(0x00000000, 0x6886c3fe, _r, _ro);
};

/**
 * Returns all peds handles known to the server.
 * The data returned adheres to the following layout:
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of peds handles.
 */
global.GetAllPeds = function () {
	return _in(0x00000000, 0xb8584fef, _r, _ro);
};

/**
 * Returns all vehicle handles known to the server.
 * The data returned adheres to the following layout:
 * ```
 * [127, 42, 13, 37]
 * ```
 * @return An object containing a list of vehicle handles.
 */
global.GetAllVehicles = function () {
	return _in(0x00000000, 0x332169f5, _r, _ro);
};

global.GetBlipSprite = function (self) {
	return _in(0x00000000, 0x72ff2e73, self, _r, _ri);
};

/**
 * Returns the current console output buffer.
 * @return The most recent game console output, as a string.
 */
global.GetConsoleBuffer = function () {
	return _in(0x00000000, 0xe57429fa, _r, _s);
};

/**
 * Can be used to get a console variable of type `char*`, for example a string.
 * @param varName The console variable to look up.
 * @param default_ The default value to set if none is found.
 * @return Returns the convar value if it can be found, otherwise it returns the assigned `default`.
 */
global.GetConvar = function (varName, default_) {
	return _in(0x00000000, 0x6ccd2564, _ts(varName), _ts(default_), _r, _s);
};

/**
 * Can be used to get a console variable casted back to `bool`.
 * @param varName The console variable to look up.
 * @param defaultValue The default value to set if none is found.
 * @return Returns the convar value if it can be found, otherwise it returns the assigned `default`.
 */
global.GetConvarBool = function (varName, defaultValue) {
	return _in(0x00000000, 0x7e8ebfe5, _ts(varName), defaultValue, _r);
};

/**
 * This will have floating point inaccuracy.
 * @param varName The console variable to get
 * @param defaultValue The default value to set, if none are found.
 * @return Returns the value set in varName, or `default` if none are specified
 */
global.GetConvarFloat = function (varName, defaultValue) {
	return _in(0x00000000, 0x009e666d, _ts(varName), _fv(defaultValue), _r, _rf);
};

/**
 * Can be used to get a console variable casted back to `int` (an integer value).
 * @param varName The console variable to look up.
 * @param default_ The default value to set if none is found (variable not set using [SET_CONVAR](#\_0x341B16D2), or not accessible).
 * @return Returns the convar value if it can be found, otherwise it returns the assigned `default`.
 */
global.GetConvarInt = function (varName, default_) {
	return _in(0x00000000, 0x935c0ab2, _ts(varName), default_, _r, _ri);
};

/**
 * Returns the hash of weapon the Ped is currently using.
 * @param ped The target ped.
 * @return The weapon hash.
 */
global.GetCurrentPedWeapon = function (ped) {
	return _in(0x00000000, 0xb0237302, ped, _r, _ri);
};

/**
 * Returns the name of the currently executing resource.
 * @return The name of the resource.
 */
global.GetCurrentResourceName = function () {
	return _in(0x00000000, 0xe5e9ebbb, _r, _s);
};

/**
 * ### Supported types
 * *   \[1] : Peds (including animals) and players.
 * *   \[2] : Vehicles.
 * *   \[3] : Objects (props), doors, and projectiles.
 * ### Coordinates need to be send unpacked (x,y,z)
 * ```lua
 * -- Define the allowed model hashes
 * local allowedModelHashes = { GetHashKey("p_crate03x"), GetHashKey("p_crate22x") }
 * -- Get the player's current coordinates
 * local playerCoords = GetEntityCoords(PlayerPedId())
 * -- Retrieve all entities of type Object (type 3) within a radius of 10.0 units
 * -- that match the allowed model hashes
 * -- and sort output entities by distance
 * local entities = GetEntitiesInRadius(playerCoords.x, playerCoords.y, playerCoords.z, 10.0, 3, true, allowedModelHashes)
 * -- Iterate through the list of entities and print their ids
 * for i = 1, #entities do
 * local entity = entities[i]
 * print(entity)
 * end
 * ```
 * @param x The X coordinate.
 * @param y The Y coordinate.
 * @param z The Z coordinate.
 * @param radius Max distance from coordinate to entity
 * @param entityType Entity types see list below
 * @param sortByDistance Sort output entites by distance from nearest to farthest
 * @param models List of allowed models its also optional
 * @return An array containing entity handles for each entity.
 */
global.GetEntitiesInRadius = function (x, y, z, radius, entityType, sortByDistance, models) {
	return _in(0x00000000, 0xdffba12f, _fv(x), _fv(y), _fv(z), _fv(radius), entityType, sortByDistance, ...(_obj(models)), _r, _ro);
};

/**
 * Gets the entity that this entity is attached to.
 * @param entity The entity to check.
 * @return The attached entity handle. 0 returned if the entity is not attached.
 */
global.GetEntityAttachedTo = function (entity) {
	return _in(0x00000000, 0xfe1589f9, entity, _r, _ri);
};

/**
 * GET_ENTITY_COLLISION_DISABLED
 * @param entity The target entity.
 * @return Returns whether or not entity collisions are disabled.
 */
global.GetEntityCollisionDisabled = function (entity) {
	return _in(0x00000000, 0xe8c0c629, entity, _r);
};

/**
 * Gets the current coordinates for a specified entity. This native is used server side when using OneSync.
 * See [GET_ENTITY_COORDS](#\_0x3FEF770D40960D5A) for client side.
 * @param entity The entity to get the coordinates from.
 * @return The current entity coordinates.
 */
global.GetEntityCoords = function (entity) {
	return _in(0x00000000, 0x1647f1cb, entity, _r, _rv);
};

/**
 * Returns the entity handle for the specified state bag name. For use with [ADD_STATE_BAG_CHANGE_HANDLER](#\_0x5BA35AAF).
 * @param bagName An internal state bag ID from the argument to a state bag change handler.
 * @return The entity handle or 0 if the state bag name did not refer to an entity, or the entity does not exist.
 */
global.GetEntityFromStateBagName = function (bagName) {
	return _in(0x00000000, 0x4bdf1867, _ts(bagName), _r, _ri);
};

/**
 * GET_ENTITY_HEADING
 */
global.GetEntityHeading = function (entity) {
	return _in(0x00000000, 0x972cc383, entity, _r, _rf);
};

/**
 * Only works for vehicle and peds
 * @param entity The entity to check the health of
 * @return If the entity is a vehicle it will return 0-1000
 * 		If the entity is a ped it will return 0-200
 * 		If the entity is an object it will return 0
 */
global.GetEntityHealth = function (entity) {
	return _in(0x00000000, 0x8e3222b7, entity, _r, _ri);
};

/**
 * Currently it only works with peds.
 */
global.GetEntityMaxHealth = function (entity) {
	return _in(0x00000000, 0xc7ae6aa1, entity, _r, _ri);
};

/**
 * GET_ENTITY_MODEL
 */
global.GetEntityModel = function (entity) {
	return _in(0x00000000, 0xdafcb3ec, entity, _r, _ri);
};

/**
 * GET_ENTITY_ORPHAN_MODE
 * @param entity The entity to get the orphan mode of
 * @return Returns the entities current orphan mode, refer to enum in [SET_ENTITY_ORPHAN_MODE](#\_0x489E9162)
 */
global.GetEntityOrphanMode = function (entity) {
	return _in(0x00000000, 0xd16ea02f, entity, _r, _ri);
};

/**
 * This native gets an entity's population type.
 * @param entity the entity to obtain the population type from
 * @return Returns the population type ID, defined by the below enumeration:```cpp
 * 		enum ePopulationType
 * 		{
 * 			POPTYPE_UNKNOWN = 0,
 * 			POPTYPE_RANDOM_PERMANENT,
 * 			POPTYPE_RANDOM_PARKED,
 * 			POPTYPE_RANDOM_PATROL,
 * 			POPTYPE_RANDOM_SCENARIO,
 * 			POPTYPE_RANDOM_AMBIENT,
 * 			POPTYPE_PERMANENT,
 * 			POPTYPE_MISSION,
 * 			POPTYPE_REPLAY,
 * 			POPTYPE_CACHE,
 * 			POPTYPE_TOOL
 * 		};
 * 		```
 */
global.GetEntityPopulationType = function (entity) {
	return _in(0x00000000, 0xfc30ddff, entity, _r, _ri);
};

/**
 * GET_ENTITY_REMOTE_SYNCED_SCENES_ALLOWED
 * @param entity The entity to get the flag for.
 * @return Returns if the entity is allowed to participate in network-synchronized scenes initiated by clients that do not own the entity.
 */
global.GetEntityRemoteSyncedScenesAllowed = function (entity) {
	return _in(0x00000000, 0x91b38fb6, entity, _r);
};

/**
 * GET_ENTITY_ROTATION
 */
global.GetEntityRotation = function (entity) {
	return _in(0x00000000, 0x8ff45b04, entity, _r, _rv);
};

/**
 * GET_ENTITY_ROTATION_VELOCITY
 */
global.GetEntityRotationVelocity = function (entity) {
	return _in(0x00000000, 0x9bf8a73f, entity, _r, _rv);
};

/**
 * Gets the routing bucket for the specified entity.
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param entity The entity to get the routing bucket for.
 * @return The routing bucket ID.
 */
global.GetEntityRoutingBucket = function (entity) {
	return _in(0x00000000, 0xed4b0486, entity, _r, _ri);
};

/**
 * GET_ENTITY_SCRIPT
 */
global.GetEntityScript = function (entity) {
	return _in(0x00000000, 0xb7f70784, entity, _r, _s);
};

/**
 * Gets the current speed of the entity in meters per second.
 * ```
 * To convert to MPH: speed * 2.236936
 * To convert to KPH: speed * 3.6
 * ```
 * @param entity The entity to get the speed of
 * @return The speed of the entity in meters per second
 */
global.GetEntitySpeed = function (entity) {
	return _in(0x00000000, 0x9e1e4798, entity, _r, _rf);
};

/**
 * Gets the entity type (as an integer), which can be one of the following defined down below:
 * **The following entities will return type `1`:**
 * *   Ped
 * *   Player
 * *   Animal (Red Dead Redemption 2)
 * *   Horse (Red Dead Redemption 2)
 * **The following entities will return type `2`:**
 * *   Automobile
 * *   Bike
 * *   Boat
 * *   Heli
 * *   Plane
 * *   Submarine
 * *   Trailer
 * *   Train
 * *   DraftVeh (Red Dead Redemption 2)
 * **The following entities will return type `3`:**
 * *   Object
 * *   Door
 * *   Pickup
 * Otherwise, a value of `0` will be returned.
 * @param entity The entity to get the type of.
 * @return The entity type returned as an integer value.
 */
global.GetEntityType = function (entity) {
	return _in(0x00000000, 0x0b1bd08d, entity, _r, _ri);
};

/**
 * GET_ENTITY_VELOCITY
 */
global.GetEntityVelocity = function (entity) {
	return _in(0x00000000, 0xc14c9b6b, entity, _r, _rv);
};

/**
 * Returns the internal build number of the current game being executed.
 * Possible values:
 * *   FiveM
 * *   1604
 * *   2060
 * *   2189
 * *   2372
 * *   2545
 * *   2612
 * *   2699
 * *   2802
 * *   2944
 * *   3095
 * *   3258
 * *   3323
 * *   3407
 * *   3570
 * *   3751
 * *   3788
 * *   3889
 * *   RedM
 * *   1311
 * *   1355
 * *   1436
 * *   1491
 * *   LibertyM
 * *   43
 * *   FXServer
 * *   0
 * @return The build number, or **0** if no build number is known.
 */
global.GetGameBuildNumber = function () {
	return _in(0x00000000, 0x804b9f7b, _r, _ri);
};

/**
 * Returns the current game being executed.
 * Possible values:
 * | Return value | Meaning                        |
 * | ------------ | ------------------------------ |
 * | `fxserver`   | Server-side code ('Duplicity') |
 * | `fivem`      | FiveM for GTA V                |
 * | `libertym`   | LibertyM for GTA IV            |
 * | `redm`       | RedM for Red Dead Redemption 2 |
 * @return The game the script environment is running in.
 */
global.GetGameName = function () {
	return _in(0x00000000, 0xe8eaa18b, _r, _s);
};

/**
 * Returns a list of entity handles (script GUID) for all entities in the specified pool - the data returned is an array as
 * follows:
 * ```json
 * [ 770, 1026, 1282, 1538, 1794, 2050, 2306, 2562, 2818, 3074, 3330, 3586, 3842, 4098, 4354, 4610, ...]
 * ```
 * ### Supported pools
 * *   `CPed`: Peds (including animals) and players.
 * *   `CObject`: Objects (props), doors, and projectiles.
 * *   `CNetObject`: Networked objects
 * *   `CVehicle`: Vehicles.
 * *   `CPickup`: Pickups.
 * @param poolName The pool name to get a list of entities from.
 * @return An array containing entity handles for each entity in the named pool.
 */
global.GetGamePool = function (poolName) {
	return _in(0x00000000, 0x2b9d4f50, _ts(poolName), _r, _ro);
};

/**
 * Gets the current game timer in milliseconds.
 * @return The game time.
 */
global.GetGameTimer = function () {
	return _in(0x00000000, 0xa4ea0691, _r, _rl);
};

/**
 * This native converts the passed string to a hash.
 */
global.GetHashKey = function (model) {
	return _in(0x00000000, 0x98eff6f1, _ts(model), _r, _ri);
};

/**
 * **Note** This native will always return `1000.0` unless [SET_VEHICLE_BODY_HEALTH](#\_0xB77D05AC8C78AADB), [SET_VEHICLE_ENGINE_HEALTH](#\_0x45F6D8EEF34ABEF1), or [SET_VEHICLE_PETROL_TANK_HEALTH](#\_0x70DB57649FA8D0D8) have been called with a value greater than `1000.0`.
 * @param heli The helicopter to check
 * @return Returns the current health of the helicopter's body.
 */
global.GetHeliBodyHealth = function (heli) {
	return _in(0x00000000, 0xa886495d, heli, _r, _ri);
};

/**
 * This is a getter for [SET_DISABLE_HELI_EXPLODE_FROM_BODY_DAMAGE](#\_0xEDBC8405B3895CC9)
 * @param heli The helicopter to check
 * @return Returns `true` if the helicopter is set to be protected from exploding due to minor body damage, `false` otherwise.
 */
global.GetHeliDisableExplodeFromBodyDamage = function (heli) {
	return _in(0x00000000, 0x82afc0a3, heli, _r);
};

/**
 * **Note** This native will always return `1000.0` unless [SET_VEHICLE_BODY_HEALTH](#\_0xB77D05AC8C78AADB), [SET_VEHICLE_ENGINE_HEALTH](#\_0x45F6D8EEF34ABEF1), or [SET_VEHICLE_PETROL_TANK_HEALTH](#\_0x70DB57649FA8D0D8) have been called with a value greater than `1000.0`.
 * @param heli The helicopter to check
 * @return Returns the current health of the helicopter's engine.
 */
global.GetHeliEngineHealth = function (heli) {
	return _in(0x00000000, 0xa0fa0354, heli, _r, _ri);
};

/**
 * **Note** This native will always return `1000.0` unless [SET_VEHICLE_BODY_HEALTH](#\_0xB77D05AC8C78AADB), [SET_VEHICLE_ENGINE_HEALTH](#\_0x45F6D8EEF34ABEF1), or [SET_VEHICLE_PETROL_TANK_HEALTH](#\_0x70DB57649FA8D0D8) have been called with a value greater than `1000.0`.
 * @param heli The helicopter to check
 * @return Returns the current health of the helicopter's gas tank.
 */
global.GetHeliGasTankHealth = function (heli) {
	return _in(0x00000000, 0xd4ec7858, heli, _r, _ri);
};

/**
 * GET_HELI_MAIN_ROTOR_DAMAGE_SCALE
 * @param heli The helicopter to check
 * @return Returns a value representing the damage scaling factor applied to the helicopter's main rotor. The value ranges from `0.0` (no damage scaling) to`  1.0 ` (full damage scaling).
 */
global.GetHeliMainRotorDamageScale = function (heli) {
	return _in(0x00000000, 0x0c37d668, heli, _r, _rf);
};

/**
 * GET_HELI_MAIN_ROTOR_HEALTH
 * @param vehicle The target vehicle.
 * @return See the client-side [GET_HELI_MAIN_ROTOR_HEALTH](#\_0xE4CB7541F413D2C5) for the return value.
 */
global.GetHeliMainRotorHealth = function (vehicle) {
	return _in(0x00000000, 0xf01e2aab, vehicle, _r, _rf);
};

/**
 * GET_HELI_PITCH_CONTROL
 * @param heli The helicopter to check.
 * @return Returns a value representing the pitch control of the helicopter. The values range from `-1.0` (nose down) to `1.0` (nose up), with `0.0` indicating no pitch input.
 */
global.GetHeliPitchControl = function (heli) {
	return _in(0x00000000, 0x1944ac95, heli, _r, _rf);
};

/**
 * GET_HELI_REAR_ROTOR_DAMAGE_SCALE
 * @param heli The helicopter to check
 * @return Returns a value representing the damage scaling factor applied to the helicopter's rear rotor. The value ranges from `0.0` (no damage scaling) to`  1.0 ` (full damage scaling).
 */
global.GetHeliRearRotorDamageScale = function (heli) {
	return _in(0x00000000, 0xc40161e2, heli, _r, _rf);
};

/**
 * This native is a getter for [SET_HELI_TAIL_ROTOR_HEALTH](#\_0xFE205F38AAA58E5B)
 * @param vehicle The target vehicle.
 * @return Returns the health of the helicopter's rear rotor. The maximum health value is `1000`.
 */
global.GetHeliRearRotorHealth = function (vehicle) {
	return _in(0x00000000, 0x33ee6e2b, vehicle, _r, _rf);
};

/**
 * GET_HELI_ROLL_CONTROL
 * @param heli The helicopter to check.
 * @return Returns a value representing the roll control of the helicopter. The values range from `-1.0` (roll left) to `1.0` (roll right), with `0.0` indicating no roll input.
 */
global.GetHeliRollControl = function (heli) {
	return _in(0x00000000, 0x12948de9, heli, _r, _rf);
};

/**
 * GET_HELI_TAIL_ROTOR_DAMAGE_SCALE
 * @param heli The helicopter to check
 * @return Returns a value representing the damage scaling factor applied to the helicopter's tail rotor. The value ranges from `0.0` (no damage scaling) to`  1.0 ` (full damage scaling).
 */
global.GetHeliTailRotorDamageScale = function (heli) {
	return _in(0x00000000, 0x22239130, heli, _r, _rf);
};

/**
 * **Note**: This native is deprecated, please use [`GET_HELI_REAR_ROTOR_HEALTH`](#\_0x33EE6E2B) instead.
 * @param vehicle The target vehicle.
 * @return Return the health of the rear rotor of the helicopter, not the tail rotor.
 */
global.GetHeliTailRotorHealth = function (vehicle) {
	return _in(0x00000000, 0xa41bc13d, vehicle, _r, _rf);
};

/**
 * GET_HELI_THROTTLE_CONTROL
 * @param heli The helicopter to check.
 * @return Returns a value representing the throttle control of the helicopter. The value ranges from `0.0` (no throttle) to `2.0` (full throttle).
 */
global.GetHeliThrottleControl = function (heli) {
	return _in(0x00000000, 0x8e86238d, heli, _r, _rf);
};

/**
 * GET_HELI_YAW_CONTROL
 * @param heli The helicopter to check.
 * @return Returns a value the yaw control of the helicopter. The value ranges from `-1.0` (yaw left) to `1.0` (yaw right), with `0.0` meaning no yaw input.
 */
global.GetHeliYawControl = function (heli) {
	return _in(0x00000000, 0x8fdc0768, heli, _r, _rf);
};

/**
 * GET_HOST_ID
 */
global.GetHostId = function () {
	return _in(0x00000000, 0x5f70f5a3, _r, _s);
};

/**
 * GET_INSTANCE_ID
 */
global.GetInstanceId = function () {
	return _in(0x00000000, 0x9f1c4383, _r, _ri);
};

/**
 * GET_INVOKING_RESOURCE
 */
global.GetInvokingResource = function () {
	return _in(0x00000000, 0x4d52fe5b, _r, _s);
};

/**
 * GET_IS_HELI_ENGINE_RUNNING
 * @param heli The helicopter to check
 * @return Returns `true` if the helicopter's engine is running, `false` if it is not.
 */
global.GetIsHeliEngineRunning = function (heli) {
	return _in(0x00000000, 0x3efe38d1, heli, _r);
};

/**
 * GET_IS_VEHICLE_ENGINE_RUNNING
 */
global.GetIsVehicleEngineRunning = function (vehicle) {
	return _in(0x00000000, 0x7dc6d022, vehicle, _r);
};

/**
 * GET_IS_VEHICLE_PRIMARY_COLOUR_CUSTOM
 */
global.GetIsVehiclePrimaryColourCustom = function (vehicle) {
	return _in(0x00000000, 0xd7ec8760, vehicle, _r);
};

/**
 * GET_IS_VEHICLE_SECONDARY_COLOUR_CUSTOM
 */
global.GetIsVehicleSecondaryColourCustom = function (vehicle) {
	return _in(0x00000000, 0x288ad228, vehicle, _r);
};

/**
 * See the client-side [GET_LANDING_GEAR_STATE](#\_0x9B0F3DCA3DB0F4CD) native for a description of landing gear states.
 * @param vehicle The vehicle to check.
 * @return The current state of the vehicles landing gear.
 */
global.GetLandingGearState = function (vehicle) {
	return _in(0x00000000, 0xa6f02670, vehicle, _r, _ri);
};

/**
 * GET_LAST_PED_IN_VEHICLE_SEAT
 * @param vehicle The target vehicle.
 * @param seatIndex See eSeatPosition declared in [`IS_VEHICLE_SEAT_FREE`](#\_0x22AC59A870E6A669).
 * @return The last ped in the specified seat of the passed vehicle. Returns 0 if the specified seat was never occupied or the last ped does not exist anymore.
 */
global.GetLastPedInVehicleSeat = function (vehicle, seatIndex) {
	return _in(0x00000000, 0xf7c6792d, vehicle, seatIndex, _r, _ri);
};

/**
 * GET_MOUNT
 * @param ped the ped id
 * @return Returns the entity the `ped` is currently on, or `0` if they're not on a mount.
 */
global.GetMount = function (ped) {
	return _in(0x00000000, 0xdd31ec4e, ped, _r, _ri);
};

/**
 * Gets the specific entity type (as an integer), which can be one of the following defined down below:
 * #### FiveM:
 * ```cpp
 * enum eNetObjEntityType
 * {
 * Automobile = 0,
 * Bike = 1,
 * Boat = 2,
 * Door = 3,
 * Heli = 4,
 * Object = 5,
 * Ped = 6,
 * Pickup = 7,
 * PickupPlacement = 8,
 * Plane = 9,
 * Submarine = 10,
 * Player = 11,
 * Trailer = 12,
 * Train = 13
 * };
 * ```
 * #### RedM:
 * ```cpp
 * enum eNetObjEntityType
 * {
 * Animal = 0,
 * Automobile = 1,
 * Bike = 2,
 * Boat = 3,
 * Door = 4,
 * Heli = 5,
 * Object = 6,
 * Ped = 7,
 * Pickup = 8,
 * PickupPlacement = 9,
 * Plane = 10,
 * Submarine = 11,
 * Player = 12,
 * Trailer = 13,
 * Train = 14,
 * DraftVeh = 15,
 * StatsTracker = 16,
 * PropSet = 17,
 * AnimScene = 18,
 * GroupScenario = 19,
 * Herd = 20,
 * Horse = 21,
 * WorldState = 22,
 * WorldProjectile = 23,
 * Incident = 24,
 * Guardzone = 25,
 * PedGroup = 26,
 * CombatDirector = 27,
 * PedSharedTargeting = 28,
 * Persistent = 29
 * };
 * ```
 * @param entity The entity to get the specific type of.
 * @return The specific entity type returned as an integer value or -1 if the entity is invalid.
 */
global.GetNetTypeFromEntity = function (entity) {
	return _in(0x00000000, 0x23b2a641, entity, _r, _ri);
};

/**
 * GET_NUM_PLAYER_IDENTIFIERS
 */
global.GetNumPlayerIdentifiers = function (playerSrc) {
	return _in(0x00000000, 0xff7f66ab, _ts(playerSrc), _r, _ri);
};

/**
 * GET_NUM_PLAYER_INDICES
 */
global.GetNumPlayerIndices = function () {
	return _in(0x00000000, 0x63d13184, _r, _ri);
};

/**
 * GET_NUM_PLAYER_TOKENS
 */
global.GetNumPlayerTokens = function (playerSrc) {
	return _in(0x00000000, 0x619e4a3d, _ts(playerSrc), _r, _ri);
};

/**
 * Gets the amount of metadata values with the specified key existing in the specified resource's manifest.
 * See also: [Resource manifest](https://docs.fivem.net/docs/scripting-reference/resource-manifest/)
 * @param resourceName The resource name.
 * @param metadataKey The key to look up in the resource manifest.
 */
global.GetNumResourceMetadata = function (resourceName, metadataKey) {
	return _in(0x00000000, 0x0776e864, _ts(resourceName), _ts(metadataKey), _r, _ri);
};

/**
 * GET_NUM_RESOURCES
 */
global.GetNumResources = function () {
	return _in(0x00000000, 0x0863f27b, _r, _ri);
};

/**
 * GET_PASSWORD_HASH
 */
global.GetPasswordHash = function (password) {
	return _in(0x00000000, 0x23473ea4, _ts(password), _r, _s);
};

/**
 * GET_PED_ARMOUR
 */
global.GetPedArmour = function (ped) {
	return _in(0x00000000, 0x2ce311a7, ped, _r, _ri);
};

/**
 * GET_PED_CAUSE_OF_DEATH
 */
global.GetPedCauseOfDeath = function (ped) {
	return _in(0x00000000, 0x63458c27, ped, _r, _ri);
};

/**
 * GET_PED_DESIRED_HEADING
 * @param ped The target ped
 * @return Returns ped's desired heading.
 */
global.GetPedDesiredHeading = function (ped) {
	return _in(0x00000000, 0xc182f76e, ped, _r, _rf);
};

/**
 * GET_PED_IN_VEHICLE_SEAT
 * @param vehicle The target vehicle.
 * @param seatIndex See eSeatPosition declared in [`IS_VEHICLE_SEAT_FREE`](#\_0x22AC59A870E6A669).
 * @return The ped in the specified seat of the passed vehicle. Returns 0 if the specified seat is not occupied.
 */
global.GetPedInVehicleSeat = function (vehicle, seatIndex) {
	return _in(0x00000000, 0x388fde9a, vehicle, seatIndex, _r, _ri);
};

/**
 * GET_PED_MAX_HEALTH
 */
global.GetPedMaxHealth = function (ped) {
	return _in(0x00000000, 0xa45b6c8d, ped, _r, _ri);
};

/**
 * Gets the current relationship group hash of a ped.
 * @param ped The target ped
 * @return The relationship group hash.
 */
global.GetPedRelationshipGroupHash = function (ped) {
	return _in(0x00000000, 0x354f283c, ped, _r, _ri);
};

/**
 * Gets the script task command currently assigned to the ped.
 * @param ped The target ped.
 * @return The script task command currently assigned to the ped. A value of 0x811E343C denotes no script task is assigned.
 */
global.GetPedScriptTaskCommand = function (ped) {
	return _in(0x00000000, 0x084fe084, ped, _r, _ri);
};

/**
 * Gets the stage of the peds scripted task.
 * @param ped The target ped.
 * @return The stage of the ped's scripted task. A value of 3 denotes no script task is assigned.
 */
global.GetPedScriptTaskStage = function (ped) {
	return _in(0x00000000, 0x44b0e5e2, ped, _r, _ri);
};

/**
 * Get the last entity that damaged the ped. This native is used server side when using OneSync.
 * @param ped The target ped
 * @return The entity id. Returns 0 if the ped has not been damaged recently.
 */
global.GetPedSourceOfDamage = function (ped) {
	return _in(0x00000000, 0x535db43f, ped, _r, _ri);
};

/**
 * Get the entity that killed the ped. This native is used server side when using OneSync.
 * @param ped The target ped
 * @return The entity id. Returns 0 if the ped has no killer.
 */
global.GetPedSourceOfDeath = function (ped) {
	return _in(0x00000000, 0x84adf9eb, ped, _r, _ri);
};

/**
 * Gets the type of a ped's specific task given an index of the CPedTaskSpecificDataNode nodes.
 * A ped will typically have a task at index 0, if a ped has multiple tasks at once they will be in the order 0, 1, 2, etc.
 * @param ped The target ped.
 * @param index A zero-based index with a maximum value of 7.
 * @return The type of the specific task.
 * 		1604: A value of 530 denotes no script task is assigned or an invalid input was given.
 * 		2060+: A value of 531 denotes no script task is assigned or an invalid input was given.
 */
global.GetPedSpecificTaskType = function (ped, index) {
	return _in(0x00000000, 0x7f4563d3, ped, index, _r, _ri);
};

/**
 * GET_PED_STEALTH_MOVEMENT
 * @param ped The target ped.
 * @return Whether or not the ped is stealthy.
 */
global.GetPedStealthMovement = function (ped) {
	return _in(0x00000000, 0x40321b83, ped, _r);
};

/**
 * Gets the current camera rotation for a specified player. This native is used server side when using OneSync.
 * @param playerSrc The player handle.
 * @return The player's camera rotation. Values are in radians.
 */
global.GetPlayerCameraRotation = function (playerSrc) {
	return _in(0x00000000, 0x433c765d, _ts(playerSrc), _r, _rv);
};

/**
 * GET_PLAYER_ENDPOINT
 */
global.GetPlayerEndpoint = function (playerSrc) {
	return _in(0x00000000, 0xfee404f9, _ts(playerSrc), _r, _s);
};

/**
 * Gets the current fake wanted level for a specified player. This native is used server side when using OneSync.
 * @param playerSrc The target player
 * @return The fake wanted level
 */
global.GetPlayerFakeWantedLevel = function (playerSrc) {
	return _in(0x00000000, 0x0098d244, _ts(playerSrc), _r, _ri);
};

/**
 * Gets the focus position (i.e. the position of the active camera in the game world) of a player.
 * @param playerSrc The player to get the focus position of
 * @return Returns a `Vector3` containing the focus position of the player.
 */
global.GetPlayerFocusPos = function (playerSrc) {
	return _in(0x00000000, 0x586f80ff, _ts(playerSrc), _r, _rv);
};

/**
 * GET_PLAYER_FROM_INDEX
 */
global.GetPlayerFromIndex = function (index) {
	return _in(0x00000000, 0xc8a9ce08, index, _r, _s);
};

/**
 * On the server this will return the players source, on the client it will return the player handle.
 * @param bagName An internal state bag ID from the argument to a state bag change handler.
 * @return The player handle or 0 if the state bag name did not refer to a player, or the player does not exist.
 */
global.GetPlayerFromStateBagName = function (bagName) {
	return _in(0x00000000, 0xa56135e0, _ts(bagName), _r, _ri);
};

/**
 * GET_PLAYER_GUID
 */
global.GetPlayerGuid = function (playerSrc) {
	return _in(0x00000000, 0xe52d9680, _ts(playerSrc), _r, _s);
};

/**
 * To get the number of identifiers, use [GET_NUM_PLAYER_IDENTIFIERS](#\_0xFF7F66AB)
 * To get a specific type of identifier, use [GET_PLAYER_IDENTIFIER_BY_TYPE](#\_0xA61C8FC6)
 * @return Returns the identifier at the specific index, if out of bounds returns `null`
 */
global.GetPlayerIdentifier = function (playerSrc, identiferIndex) {
	return _in(0x00000000, 0x7302dbcf, _ts(playerSrc), identiferIndex, _r, _s);
};

/**
 * Get an identifier from a player by the type of the identifier.
 * Known [Identifiers](https://docs.fivem.net/docs/scripting-reference/runtimes/lua/functions/GetPlayerIdentifiers/#identifier-types)
 * @param playerSrc The player to get the identifier for
 * @param identifierType The string to match in an identifier, this can be `"license"` for example.
 * @return The identifier that matches the string provided
 */
global.GetPlayerIdentifierByType = function (playerSrc, identifierType) {
	return _in(0x00000000, 0xa61c8fc6, _ts(playerSrc), _ts(identifierType), _r, _s);
};

/**
 * GET_PLAYER_INVINCIBLE
 * @param playerSrc The player handle
 * @return A boolean to tell if the player is invincible.
 */
global.GetPlayerInvincible = function (playerSrc) {
	return _in(0x00000000, 0x680c90ee, _ts(playerSrc), _r);
};

/**
 * GET_PLAYER_LAST_MSG
 */
global.GetPlayerLastMsg = function (playerSrc) {
	return _in(0x00000000, 0x427e8e6a, _ts(playerSrc), _r, _ri);
};

/**
 * GET_PLAYER_MAX_ARMOUR
 * @param playerSrc The player handle
 */
global.GetPlayerMaxArmour = function (playerSrc) {
	return _in(0x00000000, 0x02a50657, _ts(playerSrc), _r, _ri);
};

/**
 * GET_PLAYER_MAX_HEALTH
 * @param playerSrc The player handle
 */
global.GetPlayerMaxHealth = function (playerSrc) {
	return _in(0x00000000, 0x8154e470, _ts(playerSrc), _r, _ri);
};

/**
 * A getter for [SET_PLAYER_MELEE_WEAPON_DAMAGE_MODIFIER](#\_0x4A3DC7ECCC321032).
 * @param playerId The player index.
 * @return Returns player melee weapon damage modifier value.
 */
global.GetPlayerMeleeWeaponDamageModifier = function (playerId) {
	return _in(0x00000000, 0x8689a825, _ts(playerId), _r, _rf);
};

/**
 * GET_PLAYER_NAME
 */
global.GetPlayerName = function (playerSrc) {
	return _in(0x00000000, 0x406b4b20, _ts(playerSrc), _r, _s);
};

/**
 * Used to get the player's Ped Entity ID when a valid `playerSrc` is passed.
 * @param playerSrc The player source, passed as a string.
 * @return Returns a valid Ped Entity ID if the passed `playerSrc` is valid, `0` if not.
 */
global.GetPlayerPed = function (playerSrc) {
	return _in(0x00000000, 0x6e31e993, _ts(playerSrc), _r, _ri);
};

/**
 * ```cpp
 * const int ENET_PACKET_LOSS_SCALE = 65536;
 * enum PeerStatistics
 * {
 * // PacketLoss will only update once every 10 seconds, use PacketLossEpoch if you want the time
 * // since the last time the packet loss was updated.
 * // the amount of packet loss the player has, needs to be scaled with PACKET_LOSS_SCALE
 * PacketLoss = 0,
 * // The variance in the packet loss
 * PacketLossVariance = 1,
 * // The time since the last packet update in ms, relative to the peers connection time
 * PacketLossEpoch = 2,
 * // The mean amount of time it takes for a packet to get to the client (ping)
 * RoundTripTime = 3,
 * // The variance in the round trip time
 * RoundTripTimeVariance = 4,
 * // Despite their name, these are only updated once every 5 seconds, you can get the last time this was updated with PacketThrottleEpoch
 * // The last recorded round trip time of a packet
 * LastRoundTripTime = 5,
 * // The last round trip time variance
 * LastRoundTripTimeVariance = 6,
 * // The time since the last packet throttle update, relative to the peers connection time
 * PacketThrottleEpoch = 7,
 * };
 * ```
 * These statistics only update once every 10 seconds.
 * @param playerSrc The player to get the stats of
 * @param peerStatistic The statistic to get, this will error if its out of range
 * @return See `ENetStatisticType` for what this will return.
 */
global.GetPlayerPeerStatistics = function (playerSrc, peerStatistic) {
	return _in(0x00000000, 0x9a928294, _ts(playerSrc), peerStatistic, _r, _ri);
};

/**
 * See [GET_PLAYER_PEER_STATISTICS](#\_0x9A928294) if you want more detailed information, like packet loss, and packet/rtt variance
 * @return Returns the mean amount of time a packet takes to get to the client
 */
global.GetPlayerPing = function (playerSrc) {
	return _in(0x00000000, 0xff1290d4, _ts(playerSrc), _r, _ri);
};

/**
 * Gets the routing bucket for the specified player.
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param playerSrc The player to get the routing bucket for.
 * @return The routing bucket ID.
 */
global.GetPlayerRoutingBucket = function (playerSrc) {
	return _in(0x00000000, 0x52441c34, _ts(playerSrc), _r, _ri);
};

/**
 * GET_PLAYER_TEAM
 * @param playerSrc The player handle
 */
global.GetPlayerTeam = function (playerSrc) {
	return _in(0x00000000, 0x9873e404, _ts(playerSrc), _r, _ri);
};

/**
 * Gets the amount of time player has spent evading the cops.
 * Counter starts and increments only when cops are chasing the player.
 * If the player is evading, the timer will pause.
 * @param playerSrc The target player
 * @param lastPursuit False = CurrentPursuit, True = LastPursuit
 * @return Returns -1, if the player is not wanted or wasn't in pursuit before, depending on the lastPursuit parameter
 * 		Returns 0, if lastPursuit == False and the player has a wanted level, but the pursuit has not started yet
 * 		Otherwise, will return the milliseconds of the pursuit.
 */
global.GetPlayerTimeInPursuit = function (playerSrc, lastPursuit) {
	return _in(0x00000000, 0x7ade63e1, _ts(playerSrc), lastPursuit, _r, _ri);
};

/**
 * Gets the current time online for a specified player.
 * @param playerSrc A player.
 * @return The current time online in seconds.
 */
global.GetPlayerTimeOnline = function (playerSrc) {
	return _in(0x00000000, 0x67d2e605, _ts(playerSrc), _r, _ri);
};

/**
 * Gets a player's token. Tokens can be used to enhance banning logic, however are specific to a server.
 * @param playerSrc A player.
 * @param index Index between 0 and GET_NUM_PLAYER_TOKENS.
 * @return A token value.
 */
global.GetPlayerToken = function (playerSrc, index) {
	return _in(0x00000000, 0x54c06897, _ts(playerSrc), index, _r, _s);
};

/**
 * Gets the current known coordinates for the specified player from cops perspective. This native is used server side when using OneSync.
 * @param playerSrc The target player
 * @return The player's position known by police. Vector zero if the player has no wanted level.
 */
global.GetPlayerWantedCentrePosition = function (playerSrc) {
	return _in(0x00000000, 0x821f2d2c, _ts(playerSrc), _r, _rv);
};

/**
 * Returns given players wanted level server-side.
 * @param playerSrc The target player
 * @return The wanted level
 */
global.GetPlayerWantedLevel = function (playerSrc) {
	return _in(0x00000000, 0xbdcdd163, _ts(playerSrc), _r, _ri);
};

/**
 * A getter for [SET_PLAYER_WEAPON_DAMAGE_MODIFIER](#\_0xCE07B9F7817AADA3).
 * @param playerId The player index.
 * @return The value of player weapon damage modifier.
 */
global.GetPlayerWeaponDamageModifier = function (playerId) {
	return _in(0x00000000, 0x2a3d7cda, _ts(playerId), _r, _rf);
};

/**
 * A getter for [SET_PLAYER_WEAPON_DEFENSE_MODIFIER](#\_0x2D83BC011CA14A3C).
 * @param playerId The player index.
 * @return The value of player weapon defense modifier.
 */
global.GetPlayerWeaponDefenseModifier = function (playerId) {
	return _in(0x00000000, 0xf1543251, _ts(playerId), _r, _rf);
};

/**
 * A getter for [\_SET_PLAYER_WEAPON_DEFENSE_MODIFIER\_2](#\_0xBCFDE9EDE4CF27DC).
 * @param playerId The player index.
 * @return The value of player weapon defense modifier 2.
 */
global.GetPlayerWeaponDefenseModifier_2 = function (playerId) {
	return _in(0x00000000, 0x986b65ff, _ts(playerId), _r, _rf);
};

/**
 * Returns all commands that are registered in the command system.
 * The data returned adheres to the following layout:
 * ```
 * [
 * {
 * "name": "cmdlist",
 * "resource": "resource",
 * "arity" = -1,
 * },
 * {
 * "name": "command1"
 * "resource": "resource_2",
 * "arity" = -1,
 * }
 * ]
 * ```
 * @return An object containing registered commands.
 */
global.GetRegisteredCommands = function () {
	return _in(0x00000000, 0xd4bef069, _r, _ro);
};

/**
 * GET_RESOURCE_BY_FIND_INDEX
 * @param findIndex The index of the resource (starting at 0)
 * @return The resource name as a `string`
 */
global.GetResourceByFindIndex = function (findIndex) {
	return _in(0x00000000, 0x387246b7, findIndex, _r, _s);
};

/**
 * Returns all commands registered by the specified resource.
 * The data returned adheres to the following layout:
 * ```
 * [
 * {
 * "name": "cmdlist",
 * "resource": "example_resource",
 * "arity" = -1,
 * },
 * {
 * "name": "command1"
 * "resource": "example_resource2",
 * "arity" = -1,
 * }
 * ]
 * ```
 * @return An object containing registered commands.
 */
global.GetResourceCommands = function (resource) {
	return _in(0x00000000, 0x97628584, _ts(resource), _r, _ro);
};

/**
 * A getter for [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938).
 * @param key The key to fetch
 * @return The floating-point value stored under the specified key, or 0.0 if not found.
 */
global.GetResourceKvpFloat = function (key) {
	return _in(0x00000000, 0x35bdceea, _ts(key), _r, _rf);
};

/**
 * A getter for [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8).
 * @param key The key to fetch
 * @return The integer value stored under the specified key, or 0 if not found.
 */
global.GetResourceKvpInt = function (key) {
	return _in(0x00000000, 0x557b586a, _ts(key), _r, _ri);
};

/**
 * A getter for [SET_RESOURCE_KVP](#\_0x21C7A35B).
 * @param key The key to fetch
 * @return The string value stored under the specified key, or nil/null if not found.
 */
global.GetResourceKvpString = function (key) {
	return _in(0x00000000, 0x5240da5a, _ts(key), _r, _s);
};

/**
 * Gets the metadata value at a specified key/index from a resource's manifest.
 * See also: [Resource manifest](https://docs.fivem.net/docs/scripting-reference/resource-manifest/)
 * @param resourceName The resource name.
 * @param metadataKey The key in the resource manifest.
 * @param index The value index, in a range from \[0..GET_NUM_RESOURCE_METDATA-1].
 */
global.GetResourceMetadata = function (resourceName, metadataKey, index) {
	return _in(0x00000000, 0x964bab1d, _ts(resourceName), _ts(metadataKey), index, _r, _s);
};

/**
 * Returns the physical on-disk path of the specified resource.
 * @param resourceName The name of the resource.
 * @return The resource directory name, possibly without trailing slash.
 */
global.GetResourcePath = function (resourceName) {
	return _in(0x00000000, 0x61dcf017, _ts(resourceName), _r, _s);
};

/**
 * Returns the current state of the specified resource.
 * @param resourceName The name of the resource.
 * @return The resource state. One of `"missing", "started", "starting", "stopped", "stopping", "uninitialized" or "unknown"`.
 */
global.GetResourceState = function (resourceName) {
	return _in(0x00000000, 0x4039b485, _ts(resourceName), _r, _s);
};

/**
 * GET_SEAT_PED_IS_USING
 * @param ped the ped id
 * @return Returns the seat index for specified `ped`, if the ped is not sitting in a vehicle it will return -3.
 */
global.GetSeatPedIsUsing = function (ped) {
	return _in(0x00000000, 0x57b78c17, ped, _r, _ri);
};

/**
 * An alias of [GET_CURRENT_PED_WEAPON](#\_0xB0237302).
 * Note, the client-side [GET_SELECTED_PED_WEAPON](#\_0x0A6DB4965674D243) native returns the weapon selected via the HUD (weapon wheel). This data is not available to FXServer.
 * @param ped The target ped.
 * @return The weapon hash.
 */
global.GetSelectedPedWeapon = function (ped) {
	return _in(0x00000000, 0xd240123e, ped, _r, _ri);
};

/**
 * GET_STATE_BAG_KEYS
 * @param bagName The name of the bag.
 * @return Returns an array containing all keys for which the state bag has associated values.
 */
global.GetStateBagKeys = function (bagName) {
	return _in(0x00000000, 0x78d864c7, _ts(bagName), _r, _ro);
};

/**
 * Returns the value of a state bag key.
 * @return Value.
 */
global.GetStateBagValue = function (bagName, key) {
	return _in(0x00000000, 0x637f4c75, _ts(bagName), _ts(key), _r, _ro);
};

/**
 * GET_THRUSTER_SIDE_RCS_THROTTLE
 * @param jetpack The jetpack to check.
 * @return Returns a value representing the side RCS (Reaction Control System) throttle of the jetpack. The values range from `0.0` (no throttle) to `1.0` (full throttle).
 */
global.GetThrusterSideRcsThrottle = function (jetpack) {
	return _in(0x00000000, 0x1c939e87, jetpack, _r, _rf);
};

/**
 * GET_THRUSTER_THROTTLE
 * @param jetpack The jetpack to check.
 * @return Returns a value representing the main throttle of the jetpack. The values range from `0.0` (no throttle) to `1.0` (full throttle)
 */
global.GetThrusterThrottle = function (jetpack) {
	return _in(0x00000000, 0x94e24c96, jetpack, _r, _rf);
};

/**
 * GET_TRAIN_BACKWARD_CARRIAGE
 * @param train The train handle
 * @return The handle of the carriage behind this train in the chain. Otherwise returns 0 if the train is the caboose of the chain.
 */
global.GetTrainBackwardCarriage = function (train) {
	return _in(0x00000000, 0x0456e34a, train, _r, _ri);
};

/**
 * GET_TRAIN_CARRIAGE_ENGINE
 * @param train The entity handle.
 * @return The train engine carriage.
 */
global.GetTrainCarriageEngine = function (train) {
	return _in(0x00000000, 0x095070fa, train, _r, _ri);
};

/**
 * GET_TRAIN_CARRIAGE_INDEX
 * @param train The entity handle.
 * @return The carriage index. -1 returned if invalid result.
 */
global.GetTrainCarriageIndex = function (train) {
	return _in(0x00000000, 0x4b8285cf, train, _r, _ri);
};

/**
 * Gets the trains desired speed.
 * @param train The train handle
 * @return The desired cruise speed of the train. Not the speed the train is currently traveling at
 */
global.GetTrainCruiseSpeed = function (train) {
	return _in(0x00000000, 0xa4921ef5, train, _r, _rf);
};

/**
 * Gets the direction the train is facing
 * @param train The train handle
 * @return True if the train is moving forward on the track, False otherwise
 */
global.GetTrainDirection = function (train) {
	return _in(0x00000000, 0x8daf79b6, train, _r);
};

/**
 * GET_TRAIN_FORWARD_CARRIAGE
 * @param train The train handle
 * @return The handle of the carriage in front of this train in the chain. Otherwise returns 0 if the train has no carriage in front of it
 */
global.GetTrainForwardCarriage = function (train) {
	return _in(0x00000000, 0x24dc88d9, train, _r, _ri);
};

/**
 * GET_TRAIN_STATE
 * @param train The train handle
 * @return The trains current state```cpp
 * 		enum eTrainState
 * 		{
 * 		    MOVING = 0,
 * 		    ENTERING_STATION,
 * 		    OPENING_DOORS,
 * 		    STOPPED,
 * 		    CLOSING_DOORS,
 * 		    LEAVING_STATION,
 * 		}
 * 		```
 */
global.GetTrainState = function (train) {
	return _in(0x00000000, 0x81b50033, train, _r, _ri);
};

/**
 * GET_TRAIN_TRACK_INDEX
 * @param train The train handle
 * @return The track index the train is currently on.
 */
global.GetTrainTrackIndex = function (train) {
	return _in(0x00000000, 0x09aa339d, train, _r, _ri);
};

/**
 * GET_VEHICLE_BODY_HEALTH
 */
global.GetVehicleBodyHealth = function (vehicle) {
	return _in(0x00000000, 0x2b2fcc28, vehicle, _r, _rf);
};

/**
 * GET_VEHICLE_COLOURS
 */
global.GetVehicleColours = function (vehicle) {
	return _in(0x00000000, 0x40d82d88, vehicle, _i, _i);
};

/**
 * GET_VEHICLE_CUSTOM_PRIMARY_COLOUR
 */
global.GetVehicleCustomPrimaryColour = function (vehicle) {
	return _in(0x00000000, 0x1c2b9fef, vehicle, _i, _i, _i);
};

/**
 * GET_VEHICLE_CUSTOM_SECONDARY_COLOUR
 */
global.GetVehicleCustomSecondaryColour = function (vehicle) {
	return _in(0x00000000, 0x3ff247a2, vehicle, _i, _i, _i);
};

/**
 * GET_VEHICLE_DASHBOARD_COLOUR
 */
global.GetVehicleDashboardColour = function (vehicle, color) {
	return _in(0x00000000, 0xa0dbd08d, vehicle, _ii(color) /* may be optional */);
};

/**
 * GET_VEHICLE_DIRT_LEVEL
 */
global.GetVehicleDirtLevel = function (vehicle) {
	return _in(0x00000000, 0xfd15c065, vehicle, _r, _rf);
};

/**
 * ```lua
 * enum_VehicleLockStatus = {
 * None = 0,
 * Locked = 2,
 * LockedForPlayer = 3,
 * StickPlayerInside = 4, -- Doesn't allow players to exit the vehicle with the exit vehicle key.
 * CanBeBrokenInto = 7, -- Can be broken into the car. If the glass is broken, the value will be set to 1
 * CanBeBrokenIntoPersist = 8, -- Can be broken into persist
 * CannotBeTriedToEnter = 10, -- Cannot be tried to enter (Nothing happens when you press the vehicle enter key).
 * }
 * ```
 * It should be [noted](https://forum.cfx.re/t/4863241) that while the [client-side command](#\_0x25BC98A59C2EA962) and its
 * setter distinguish between states 0 (unset) and 1 (unlocked), the game will synchronize both as state 0, so the server-side
 * command will return only '0' if unlocked.
 * @param vehicle A vehicle handle.
 * @return The door lock status for the specified vehicle.
 */
global.GetVehicleDoorLockStatus = function (vehicle) {
	return _in(0x00000000, 0x0d72cef2, vehicle, _r, _ri);
};

/**
 * Returns the open position of the specified door on the target vehicle.
 * @param vehicle The target vehicle.
 * @param doorIndex Index of door to check (0-6).
 * @return A number from 0 to 7.
 */
global.GetVehicleDoorStatus = function (vehicle, doorIndex) {
	return _in(0x00000000, 0x6e35c49c, vehicle, doorIndex, _r, _ri);
};

/**
 * Currently it only works when set to "all players".
 */
global.GetVehicleDoorsLockedForPlayer = function (vehicle) {
	return _in(0x00000000, 0x1dc50247, vehicle, _r, _ri);
};

/**
 * GET_VEHICLE_ENGINE_HEALTH
 */
global.GetVehicleEngineHealth = function (vehicle) {
	return _in(0x00000000, 0x8880038a, vehicle, _r, _rf);
};

/**
 * GET_VEHICLE_EXTRA_COLOURS
 */
global.GetVehicleExtraColours = function (vehicle) {
	return _in(0x00000000, 0x80e4659b, vehicle, _i, _i);
};

/**
 * Gets the flight nozzel position for the specified vehicle. See the client-side [\_GET_VEHICLE_FLIGHT_NOZZLE_POSITION](#\_0xDA62027C8BDB326E) native for usage examples.
 * @param vehicle The vehicle to check.
 * @return The flight nozzel position between 0.0 (flying normally) and 1.0 (VTOL mode)
 */
global.GetVehicleFlightNozzlePosition = function (vehicle) {
	return _in(0x00000000, 0xad40ad55, vehicle, _r, _rf);
};

/**
 * GET_VEHICLE_HANDBRAKE
 */
global.GetVehicleHandbrake = function (vehicle) {
	return _in(0x00000000, 0x483b013c, vehicle, _r);
};

/**
 * GET_VEHICLE_HEADLIGHTS_COLOUR
 */
global.GetVehicleHeadlightsColour = function (vehicle) {
	return _in(0x00000000, 0xd7147656, vehicle, _r, _ri);
};

/**
 * Gets the lock on state for the specified vehicle. See the client-side [GET_VEHICLE_HOMING_LOCKON_STATE](#\_0xE6B0E8CFC3633BF0) native for a description of lock on states.
 * @param vehicle The vehicle to check.
 * @return The lock on state.
 */
global.GetVehicleHomingLockonState = function (vehicle) {
	return _in(0x00000000, 0xfbde9fd8, vehicle, _r, _ri);
};

/**
 * This is a getter for the client-side native [`START_VEHICLE_HORN`](#\_0x9C8C6504B5B63D2C), which allows you to return the horn type of the vehicle.
 * **Note**: This native only gets the hash value set with `START_VEHICLE_HORN`. If a wrong hash is passed into `START_VEHICLE_HORN`, it will return this wrong hash.
 * ```cpp
 * enum eHornTypes
 * {
 * NORMAL = 1330140148,
 * HELDDOWN = -2087385909,
 * AGGRESSIVE = -92810745
 * }
 * ```
 * @param vehicle The vehicle to check the horn type.
 * @return Returns the vehicle horn type hash, or `0` if one is not set.
 */
global.GetVehicleHornType = function (vehicle) {
	return _in(0x00000000, 0xdea49773, vehicle, _r, _ri);
};

/**
 * GET_VEHICLE_INTERIOR_COLOUR
 */
global.GetVehicleInteriorColour = function (vehicle, color) {
	return _in(0x00000000, 0xccff3b6e, vehicle, _ii(color) /* may be optional */);
};

/**
 * GET_VEHICLE_LIGHTS_STATE
 */
global.GetVehicleLightsState = function (vehicle) {
	return _in(0x00000000, 0x7c278621, vehicle, _i /* actually bool */, _i /* actually bool */, _r);
};

/**
 * GET_VEHICLE_LIVERY
 */
global.GetVehicleLivery = function (vehicle) {
	return _in(0x00000000, 0xec82a51d, vehicle, _r, _ri);
};

/**
 * Gets the vehicle that is locked on to for the specified vehicle.
 * @param vehicle The vehicle to check.
 * @return The vehicle that is locked on. 0 returned if no vehicle is locked on.
 */
global.GetVehicleLockOnTarget = function (vehicle) {
	return _in(0x00000000, 0x4a557117, vehicle, _r, _ri);
};

/**
 * Getter to check the neon colour of a vehicle. This native is the server side getter of [GET_VEHICLE_NEON_LIGHTS_COLOUR](#\_0x7619EEE8C886757F).
 * @param vehicle The vehicle to check.
 * @param red Pointer to an integer where the red component of the neon color will be stored.
 * @param green Pointer to an integer where the green component of the neon color will be stored.
 * @param blue Pointer to an integer where the blue component of the neon color will be stored.
 * @return None. The neon color values are retrieved and stored in the `red`, `green`, and `blue` pointers. Make sure to store the returned values in variables for further use.
 */
global.GetVehicleNeonColour = function (vehicle) {
	return _in(0x00000000, 0xd9319dcb, vehicle, _i, _i, _i);
};

/**
 * Getter to check if one of the neon lights of a vehicle is enabled. This native is the server side getter of [IS_VEHICLE_NEON_LIGHT_ENABLED](#\_0x8C4B92553E4766A5).
 * ```cpp
 * enum neonIndex
 * {
 * NEON_BACK = 0,   // Back neon
 * NEON_RIGHT = 1,  // Right neon
 * NEON_LEFT = 2,   // Left neon
 * NEON_FRONT = 3   // Front neon
 * };
 * ```
 * @param vehicle The vehicle to check.
 * @param neonIndex A value from the neonIndex enum representing the neon light to check.
 * @return Returns `true` if the specified neon light is enabled, `false` otherwise.
 */
global.GetVehicleNeonEnabled = function (vehicle, neonIndex) {
	return _in(0x00000000, 0x684bdbf2, vehicle, neonIndex, _r);
};

/**
 * GET_VEHICLE_NUMBER_PLATE_TEXT
 */
global.GetVehicleNumberPlateText = function (vehicle) {
	return _in(0x00000000, 0xe8522d58, vehicle, _r, _s);
};

/**
 * GET_VEHICLE_NUMBER_PLATE_TEXT_INDEX
 */
global.GetVehicleNumberPlateTextIndex = function (vehicle) {
	return _in(0x00000000, 0x499747b6, vehicle, _r, _ri);
};

/**
 * Gets the vehicle the specified Ped is/was in depending on bool value. This native is used server side when using OneSync.
 * @param ped The target ped
 * @param lastVehicle False = CurrentVehicle, True = LastVehicle
 * @return The vehicle id. Returns 0 if the ped is/was not in a vehicle.
 */
global.GetVehiclePedIsIn = function (ped, lastVehicle) {
	return _in(0x00000000, 0xafe92319, ped, lastVehicle, _r, _ri);
};

/**
 * GET_VEHICLE_PETROL_TANK_HEALTH
 */
global.GetVehiclePetrolTankHealth = function (vehicle) {
	return _in(0x00000000, 0xe41595ce, vehicle, _r, _rf);
};

/**
 * GET_VEHICLE_RADIO_STATION_INDEX
 */
global.GetVehicleRadioStationIndex = function (vehicle) {
	return _in(0x00000000, 0x57037960, vehicle, _r, _ri);
};

/**
 * GET_VEHICLE_ROOF_LIVERY
 */
global.GetVehicleRoofLivery = function (vehicle) {
	return _in(0x00000000, 0x0872cf42, vehicle, _r, _ri);
};

/**
 * GET_VEHICLE_STEERING_ANGLE
 */
global.GetVehicleSteeringAngle = function (vehicle) {
	return _in(0x00000000, 0x1382fcea, vehicle, _r, _rf);
};

/**
 * GET_VEHICLE_TOTAL_REPAIRS
 * @return Returns the total amount of repairs. Each repair will increase the count to make it possible to detect client repairs.
 * 		The value has a range from 0 to 15. Next value after 15 is 0.
 */
global.GetVehicleTotalRepairs = function (vehicle) {
	return _in(0x00000000, 0x9963d5f9, vehicle, _r, _ri);
};

/**
 * Returns the type of the passed vehicle.
 * For client scripts, reference the more detailed [GET_VEHICLE_TYPE_RAW](#\_0xDE73BC10) native.
 * ### Vehicle types
 * *   automobile
 * *   bike
 * *   boat
 * *   heli
 * *   plane
 * *   submarine
 * *   trailer
 * *   train
 * @param vehicle The vehicle's entity handle.
 * @return If the entity is a vehicle, the vehicle type. If it is not a vehicle, the return value will be null.
 */
global.GetVehicleType = function (vehicle) {
	return _in(0x00000000, 0xa273060e, vehicle, _r, _s);
};

/**
 * GET_VEHICLE_TYRE_SMOKE_COLOR
 */
global.GetVehicleTyreSmokeColor = function (vehicle) {
	return _in(0x00000000, 0x75280015, vehicle, _i, _i, _i);
};

/**
 * GET_VEHICLE_WHEEL_TYPE
 */
global.GetVehicleWheelType = function (vehicle) {
	return _in(0x00000000, 0xda58d7ae, vehicle, _r, _ri);
};

/**
 * GET_VEHICLE_WINDOW_TINT
 */
global.GetVehicleWindowTint = function (vehicle) {
	return _in(0x00000000, 0x13d53892, vehicle, _r, _ri);
};

/**
 * GIVE_WEAPON_COMPONENT_TO_PED
 */
global.GiveWeaponComponentToPed = function (ped, weaponHash, componentHash) {
	return _in(0x00000000, 0x3e1e286d, ped, _ch(weaponHash), _ch(componentHash));
};

/**
 * GIVE_WEAPON_TO_PED
 */
global.GiveWeaponToPed = function (ped, weaponHash, ammoCount, isHidden, bForceInHand) {
	return _in(0x00000000, 0xc4d88a85, ped, _ch(weaponHash), ammoCount, isHidden, bForceInHand);
};

/**
 * HAS_ENTITY_BEEN_MARKED_AS_NO_LONGER_NEEDED
 */
global.HasEntityBeenMarkedAsNoLongerNeeded = function (vehicle) {
	return _in(0x00000000, 0x9c9a3be0, vehicle, _r);
};

/**
 * HAS_VEHICLE_BEEN_DAMAGED_BY_BULLETS
 * @param vehicle The target vehicle.
 * @return Returns whether or not the target vehicle has been damaged by bullets.
 */
global.HasVehicleBeenDamagedByBullets = function (vehicle) {
	return _in(0x00000000, 0xb8af3137, vehicle, _r);
};

/**
 * HAS_VEHICLE_BEEN_OWNED_BY_PLAYER
 */
global.HasVehicleBeenOwnedByPlayer = function (vehicle) {
	return _in(0x00000000, 0xe4e83a5b, vehicle, _r);
};

/**
 * IS_ACE_ALLOWED
 */
global.IsAceAllowed = function (object) {
	return _in(0x00000000, 0x7ebb9929, _ts(object), _r);
};

/**
 * IS_BOAT_ANCHORED_AND_FROZEN
 * @param vehicle The target vehicle.
 * @return Returns whether or not the boat is anchored and frozen.
 */
global.IsBoatAnchoredAndFrozen = function (vehicle) {
	return _in(0x00000000, 0xd5c39ee6, vehicle, _r);
};

/**
 * IS_BOAT_WRECKED
 * @param vehicle The target vehicle.
 * @return Returns whether or not the boat is wrecked.
 */
global.IsBoatWrecked = function (vehicle) {
	return _in(0x00000000, 0x9049db44, vehicle, _r);
};

/**
 * Gets whether or not this is the CitizenFX server.
 * @return A boolean value.
 */
global.IsDuplicityVersion = function () {
	return _in(0x00000000, 0xcf24c52e, _r);
};

/**
 * A getter for [FREEZE_ENTITY_POSITION](#\_0x428CA6DBD1094446).
 * @param entity The entity to check for
 * @return Boolean stating if it is frozen or not.
 */
global.IsEntityPositionFrozen = function (entity) {
	return _in(0x00000000, 0xedbe6add, entity, _r);
};

/**
 * This native checks if the given entity is visible.
 * @return Returns `true` if the entity is visible, `false` otherwise.
 */
global.IsEntityVisible = function (entity) {
	return _in(0x00000000, 0x120b4ed5, entity, _r);
};

/**
 * IS_FLASH_LIGHT_ON
 * @param ped The target ped.
 * @return Whether or not the ped's flash light is on.
 */
global.IsFlashLightOn = function (ped) {
	return _in(0x00000000, 0x76876154, ped, _r);
};

/**
 * This is a getter for [SET_HELI_TAIL_EXPLODE_THROW_DASHBOARD](#\_0x3EC8BF18AA453FE9)
 * @param heli The helicopter to check
 * @return Returns `true` if the helicopter's tail boom can break, `false` if it cannot.
 */
global.IsHeliTailBoomBreakable = function (heli) {
	return _in(0x00000000, 0x23e46bd7, heli, _r);
};

/**
 * IS_HELI_TAIL_BOOM_BROKEN
 * @param heli The helicopter to check
 * @return Returns `true` if the helicopter's tail boom is broken, `false` if it is intact.
 */
global.IsHeliTailBoomBroken = function (heli) {
	return _in(0x00000000, 0x2c59f987, heli, _r);
};

/**
 * This native checks if the given ped is a player.
 * @return Returns `true` if the ped is a player, `false` otherwise.
 */
global.IsPedAPlayer = function (ped) {
	return _in(0x00000000, 0x404794ca, ped, _r);
};

/**
 * IS_PED_HANDCUFFED
 * @param ped The target ped.
 * @return Whether or not the ped is handcuffed.
 */
global.IsPedHandcuffed = function (ped) {
	return _in(0x00000000, 0x25865633, ped, _r);
};

/**
 * IS_PED_IN_ANY_VEHICLE
 * @param ped the ped id
 * @return Returns `true` if the specified `ped` is in any vehicle
 */
global.IsPedInAnyVehicle = function (ped) {
	return _in(0x00000000, 0x3b0171ee, ped, _r);
};

/**
 * IS_PED_IN_VEHICLE
 * @param ped the ped id
 * @param vehicle the vehicle id
 * @return Returns `true` if the specified `ped` is in the specified `vehicle`
 */
global.IsPedInVehicle = function (ped, vehicle) {
	return _in(0x00000000, 0x7da6bc83, ped, vehicle, _r);
};

/**
 * IS_PED_ON_MOUNT
 * @param ped the ped id
 * @return Returns `true` if the specified `ped` is on a mount.
 */
global.IsPedOnMount = function (ped) {
	return _in(0x00000000, 0x43103006, ped, _r);
};

/**
 * IS_PED_RAGDOLL
 * @param ped The target ped.
 * @return Whether or not the ped is ragdolling.
 */
global.IsPedRagdoll = function (ped) {
	return _in(0x00000000, 0xc833bbe1, ped, _r);
};

/**
 * IS_PED_STRAFING
 * @param ped The target ped.
 * @return Whether or not the ped is strafing.
 */
global.IsPedStrafing = function (ped) {
	return _in(0x00000000, 0xefeed13c, ped, _r);
};

/**
 * IS_PED_USING_ACTION_MODE
 * @param ped The target ped.
 * @return Whether or not the ped is using action mode.
 */
global.IsPedUsingActionMode = function (ped) {
	return _in(0x00000000, 0x5ae7eda2, ped, _r);
};

/**
 * IS_PLAYER_ACE_ALLOWED
 */
global.IsPlayerAceAllowed = function (playerSrc, object) {
	return _in(0x00000000, 0xdedae23d, _ts(playerSrc), _ts(object), _r);
};

/**
 * > This native is deprecated and may be removed in a future version. Use [`IS_PLAYER_COMMERCE_INFO_LOADED_EXT`](#\_0x1D14F4FE) instead.
 * Requests whether or not the commerce data for the specified player has loaded.
 * @param playerSrc The player handle
 * @return A boolean.
 */
global.IsPlayerCommerceInfoLoaded = function (playerSrc) {
	return _in(0x00000000, 0xbefe93f4, _ts(playerSrc), _r);
};

/**
 * Requests whether or not the commerce data for the specified player has loaded from Tebex.
 * @param playerSrc The player handle
 * @return A boolean.
 */
global.IsPlayerCommerceInfoLoadedExt = function (playerSrc) {
	return _in(0x00000000, 0x1d14f4fe, _ts(playerSrc), _r);
};

/**
 * This will return true if the player is evading wanted level, meaning that the wanted level stars are blink.
 * Otherwise will return false.
 * If the player is not wanted, it simply returns false.
 * @param playerSrc The target player
 * @return boolean value, depending if the player is evading his wanted level or not.
 */
global.IsPlayerEvadingWantedLevel = function (playerSrc) {
	return _in(0x00000000, 0x89a3881a, _ts(playerSrc), _r);
};

/**
 * IS_PLAYER_IN_FREE_CAM_MODE
 * @param playerSrc The player to get the free camera mode status of
 * @return Returns if the player is in free camera mode.
 */
global.IsPlayerInFreeCamMode = function (playerSrc) {
	return _in(0x00000000, 0x1f14f2ac, _ts(playerSrc), _r);
};

/**
 * IS_PLAYER_USING_SUPER_JUMP
 * @param playerSrc The player handle
 * @return A boolean.
 */
global.IsPlayerUsingSuperJump = function (playerSrc) {
	return _in(0x00000000, 0xc7d2c20c, _ts(playerSrc), _r);
};

/**
 * IS_PRINCIPAL_ACE_ALLOWED
 */
global.IsPrincipalAceAllowed = function (principal, object) {
	return _in(0x00000000, 0x37cf52ce, _ts(principal), _ts(object), _r);
};

/**
 * IS_TRAIN_CABOOSE
 * @param train The train handle
 * @return Returns true if the train is the caboose of the chain.
 */
global.IsTrainCaboose = function (train) {
	return _in(0x00000000, 0xfa9336e5, train, _r);
};

/**
 * IS_VEHICLE_ENGINE_STARTING
 */
global.IsVehicleEngineStarting = function (vehicle) {
	return _in(0x00000000, 0xbb340d04, vehicle, _r);
};

/**
 * IS_VEHICLE_EXTRA_TURNED_ON
 */
global.IsVehicleExtraTurnedOn = function (vehicle, extraId) {
	return _in(0x00000000, 0x042098b5, vehicle, extraId, _r);
};

/**
 * IS_VEHICLE_SIREN_ON
 */
global.IsVehicleSirenOn = function (vehicle) {
	return _in(0x00000000, 0x25eb5873, vehicle, _r);
};

/**
 * IS_VEHICLE_TYRE_BURST
 */
global.IsVehicleTyreBurst = function (vehicle, wheelID, completely) {
	return _in(0x00000000, 0x48c80210, vehicle, wheelID, completely, _r);
};

/**
 * See the client-side [IS_VEHICLE_WINDOW_INTACT](#\_0x46E571A0E20D01F1) for a window indexes list.
 * @param vehicle The target vehicle.
 * @param windowIndex The window index.
 */
global.IsVehicleWindowIntact = function (vehicle, windowIndex) {
	return _in(0x00000000, 0xac4ef23d, vehicle, windowIndex, _r);
};

/**
 * > This native is deprecated and may be removed in a future version. Use [`LOAD_PLAYER_COMMERCE_DATA_EXT`](#\_0x7995539E) instead.
 * Requests the commerce data for the specified player, including the owned SKUs. Use `IS_PLAYER_COMMERCE_INFO_LOADED` to check if it has loaded.
 * @param playerSrc The player handle
 */
global.LoadPlayerCommerceData = function (playerSrc) {
	return _in(0x00000000, 0xa8f63eab, _ts(playerSrc));
};

/**
 * Requests the commerce data from Tebex for the specified player, including the owned SKUs.
 * Use [`IS_PLAYER_COMMERCE_INFO_LOADED_EXT`](#\_0x1D14F4FE) to check if it has loaded.
 * This will not automatically update whenever a client purchases a package, if you want to fetch new purchases you will need to call this native again.
 * This native will temporarily cache the players commerce data for 10 seconds, a call to this native after 10 seconds will re-fetch the players commerce data.
 * @param playerSrc The player handle
 */
global.LoadPlayerCommerceDataExt = function (playerSrc) {
	return _in(0x00000000, 0x7995539e, _ts(playerSrc));
};

/**
 * Reads the contents of a text file in a specified resource.
 * If executed on the client, this file has to be included in `files` in the resource manifest.
 * Example: `local data = LoadResourceFile("devtools", "data.json")`
 * @param resourceName The resource name.
 * @param fileName The file in the resource.
 * @return The file contents
 */
global.LoadResourceFile = function (resourceName, fileName) {
	return _in(0x00000000, 0x76a9ee1f, _ts(resourceName), _ts(fileName), _r, _s);
};

/**
 * Create a permanent voice channel.
 * @param id ID of the channel.
 */
global.MumbleCreateChannel = function (id) {
	return _in(0x00000000, 0x262663c5, id);
};

/**
 * Checks if the player is currently muted
 * @param playerSrc The player to get the mute state for
 * @return Whether or not the player is muted
 */
global.MumbleIsPlayerMuted = function (playerSrc) {
	return _in(0x00000000, 0x1d5d50c2, playerSrc, _r);
};

/**
 * Mutes or unmutes the specified player
 * @param playerSrc The player to set the mute state of
 * @param toggle Whether to mute or unmute the player
 */
global.MumbleSetPlayerMuted = function (playerSrc, toggle) {
	return _in(0x00000000, 0xcc6c2eb1, playerSrc, toggle);
};

/**
 * NETWORK_GET_ENTITY_FROM_NETWORK_ID
 */
global.NetworkGetEntityFromNetworkId = function (netId) {
	return _in(0x00000000, 0x5b912c3f, netId, _r, _ri);
};

/**
 * Returns the owner ID of the specified entity.
 * @param entity The entity to get the owner for.
 * @return On the server, the server ID of the entity owner. On the client, returns the player/slot ID of the entity owner.
 */
global.NetworkGetEntityOwner = function (entity) {
	return _in(0x00000000, 0x526fee31, entity, _r, _ri);
};

/**
 * Returns the first owner ID of the specified entity.
 * @param entity The entity to get the first owner for.
 * @return The server ID of the first entity owner.
 */
global.NetworkGetFirstEntityOwner = function (entity) {
	return _in(0x00000000, 0x1e546224, entity, _r, _ri);
};

/**
 * NETWORK_GET_NETWORK_ID_FROM_ENTITY
 */
global.NetworkGetNetworkIdFromEntity = function (entity) {
	return _in(0x00000000, 0x9e35dab6, entity, _r, _ri);
};

/**
 * NETWORK_GET_VOICE_PROXIMITY_OVERRIDE_FOR_PLAYER
 * @param playerSrc The player handle
 */
global.NetworkGetVoiceProximityOverrideForPlayer = function (playerSrc) {
	return _in(0x00000000, 0xffeef513, _ts(playerSrc), _r, _rv);
};

/**
 * PERFORM_HTTP_REQUEST_INTERNAL
 */
global.PerformHttpRequestInternal = function (requestData, requestDataLength) {
	return _in(0x00000000, 0x8e8cc653, _ts(requestData), requestDataLength, _r, _ri);
};

/**
 * PERFORM_HTTP_REQUEST_INTERNAL_EX
 */
global.PerformHttpRequestInternalEx = function (requestData) {
	return _in(0x00000000, 0x6b171e87, ...(_obj(requestData)), _r, _ri);
};

/**
 * Prints 'structured trace' data to the server `file descriptor 3` channel. This is not generally useful outside of
 * server monitoring utilities.
 * @param jsonString JSON data to submit as `payload` in the `script_structured_trace` event.
 */
global.PrintStructuredTrace = function (jsonString) {
	return _in(0x00000000, 0x90892ded, _ts(jsonString));
};

/**
 * Scope entry for profiler.
 * @param scopeName Scope name.
 */
global.ProfilerEnterScope = function (scopeName) {
	return _in(0x00000000, 0xc795a4a9, _ts(scopeName));
};

/**
 * Scope exit for profiler.
 */
global.ProfilerExitScope = function () {
	return _in(0x00000000, 0xb39ca35c);
};

/**
 * Returns true if the profiler is active.
 * @return True or false.
 */
global.ProfilerIsRecording = function () {
	return _in(0x00000000, 0xf8b7d7bb, _r);
};

/**
 * Registered commands can be executed by entering them in the client console (this works for client side and server side registered commands). Or by entering them in the server console/through an RCON client (only works for server side registered commands). Or if you use a supported chat resource, like the default one provided in the cfx-server-data repository, then you can enter the command in chat by prefixing it with a `/`.
 * Commands registered using this function can also be executed by resources, using the [`ExecuteCommand` native](#\_0x561C060B).
 * The restricted bool is not used on the client side. Permissions can only be checked on the server side, so if you want to limit your command with an ace permission automatically, make it a server command (by registering it in a server script).
 * **Example result**:
 * ![](https://i.imgur.com/TaCnG09.png)
 * @param commandName The command you want to register.
 * @param handler A handler function that gets called whenever the command is executed.
 * @param restricted If this is a server command and you set this to true, then players will need the command.yourCommandName ace permission to execute this command.
 */
global.RegisterCommand = function (commandName, handler, restricted) {
	return _in(0x00000000, 0x5fa79b0f, _ts(commandName), _mfr(handler), restricted);
};

/**
 * Registers a listener for console output messages.
 * @param listener A function of `(channel: string, message: string) => void`. The message might contain `\n`.
 */
global.RegisterConsoleListener = function (listener) {
	return _in(0x00000000, 0x281b5448, _mfr(listener));
};

/**
 * An internal function which allows the current resource's HLL script runtimes to receive state for the specified event.
 * @param eventName An event name, or "\*" to disable HLL event filtering for this resource.
 */
global.RegisterResourceAsEventHandler = function (eventName) {
	return _in(0x00000000, 0xd233a168, _ts(eventName));
};

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * Registers a cached resource asset with the resource system, similar to the automatic scanning of the `stream/` folder.
 * @param resourceName The resource to add the asset to.
 * @param fileName A file name in the resource.
 * @return A cache string to pass to `REGISTER_STREAMING_FILE_FROM_CACHE` on the client.
 */
global.RegisterResourceAsset = function (resourceName, fileName) {
	return _in(0x00000000, 0x9862b266, _ts(resourceName), _ts(fileName), _r, _s);
};

/**
 * Registers a build task factory for resources.
 * The function should return an object (msgpack map) with the following fields:
 * ```
 * {
 * // returns whether the specific resource should be built
 * shouldBuild = func(resourceName: string): bool,
 * // asynchronously start building the specific resource.
 * // call cb when completed
 * build = func(resourceName: string, cb: func(success: bool, status: string): void): void
 * }
 * ```
 * @param factoryId The identifier for the build task.
 * @param factoryFn The factory function.
 */
global.RegisterResourceBuildTaskFactory = function (factoryId, factoryFn) {
	return _in(0x00000000, 0x285b43ca, _ts(factoryId), _mfr(factoryFn));
};

/**
 * Parameter `p1` does not seem to be used or referenced in game binaries.\
 * **Note:** When called for networked entities, a `CRemoveAllWeaponsEvent` will be created per request.
 * @param ped The ped entity
 */
global.RemoveAllPedWeapons = function (ped, p1) {
	return _in(0x00000000, 0xa44ce817, ped, p1);
};

/**
 * Removes the blip from your map.
 * **Note:** This function only works on the script that created the blip, if you wish to remove blips created by other scripts, see [`SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT`](#\_0xB98236CAAECEF897).
 * @param blip Blip handle to remove.
 */
global.RemoveBlip = function (blip) {
	return _in(0x00000000, 0xd8c3c1cd, _ii(blip) /* may be optional */);
};

/**
 * REMOVE_CONVAR_CHANGE_LISTENER
 * @param cookie The cookie returned from [ADD_CONVAR_CHANGE_LISTENER](#\_0xAB7F7241)
 */
global.RemoveConvarChangeListener = function (cookie) {
	return _in(0x00000000, 0xeac49841, cookie);
};

/**
 * **Experimental**: This native may be altered or removed in future versions of CitizenFX without warning.
 * Removes a handler for changes to a state bag.
 * @param cookie The cookie.
 */
global.RemoveStateBagChangeHandler = function (cookie) {
	return _in(0x00000000, 0xd36be661, cookie);
};

/**
 * REMOVE_WEAPON_COMPONENT_FROM_PED
 */
global.RemoveWeaponComponentFromPed = function (ped, weaponHash, componentHash) {
	return _in(0x00000000, 0x412aa00d, ped, _ch(weaponHash), _ch(componentHash));
};

/**
 * This native removes a specified weapon from your selected ped.
 * Weapon Hashes: pastebin.com/0wwDZgkF
 * Example:
 * C#:
 * Function.Call(Hash.REMOVE_WEAPON_FROM_PED, Game.Player.Character, 0x99B507EA);
 * C++:
 * WEAPON::REMOVE_WEAPON_FROM_PED(PLAYER::PLAYER_PED_ID(), 0x99B507EA);
 * The code above removes the knife from the player.
 */
global.RemoveWeaponFromPed = function (ped, weaponHash) {
	return _in(0x00000000, 0x9c37f220, ped, _ch(weaponHash));
};

/**
 * > This native is deprecated and may be removed in a future version. Use the [Tebex API](https://docs.tebex.io/) instead.
 * Requests the specified player to buy the passed SKU. This'll pop up a prompt on the client, which upon acceptance
 * will open the browser prompting further purchase details.
 * @param playerSrc The player handle
 * @param skuId The ID of the SKU.
 */
global.RequestPlayerCommerceSession = function (playerSrc, skuId) {
	return _in(0x00000000, 0x96f93cce, _ts(playerSrc), skuId);
};

/**
 * Writes the specified data to a file in the specified resource.
 * Using a length of `-1` will automatically detect the length assuming the data is a C string.
 * @param resourceName The name of the resource.
 * @param fileName The name of the file.
 * @param data The data to write to the file.
 * @param dataLength The length of the written data.
 * @return A value indicating if the write succeeded.
 */
global.SaveResourceFile = function (resourceName, fileName, data, dataLength) {
	return _in(0x00000000, 0xa09e7e7b, _ts(resourceName), _ts(fileName), _ts(data), dataLength, _r);
};

/**
 * Scans the resources in the specified resource root. This function is only available in the 'monitor mode' process and is
 * not available for user resources.
 * @param rootPath The resource directory to scan.
 * @param callback A callback that will receive an object with results.
 */
global.ScanResourceRoot = function (rootPath, callback) {
	return _in(0x00000000, 0x636f097f, _ts(rootPath), _mfr(callback));
};

/**
 * Schedules the specified resource to run a tick as soon as possible, bypassing the server's fixed tick rate.
 * @param resourceName The resource to tick.
 */
global.ScheduleResourceTick = function (resourceName) {
	return _in(0x00000000, 0xb88a73ad, _ts(resourceName));
};

/**
 * Sets the displayed sprite for a specific blip.
 * There's a [list of sprites](https://docs.fivem.net/docs/game-references/blips/) on the FiveM documentation site.
 * @param blip The blip to change.
 * @param spriteId The sprite ID to set.
 */
global.SetBlipSprite = function (blip, spriteId) {
	return _in(0x00000000, 0x8dbbb0b9, blip, spriteId);
};

/**
 * SET_CONVAR
 */
global.SetConvar = function (varName, value) {
	return _in(0x00000000, 0x341b16d2, _ts(varName), _ts(value));
};

/**
 * Used to replicate a server variable onto clients.
 * @param varName The console variable name.
 * @param value The value to set for the given console variable.
 */
global.SetConvarReplicated = function (varName, value) {
	return _in(0x00000000, 0xf292858c, _ts(varName), _ts(value));
};

/**
 * SET_CONVAR_SERVER_INFO
 */
global.SetConvarServerInfo = function (varName, value) {
	return _in(0x00000000, 0x9338d547, _ts(varName), _ts(value));
};

/**
 * SET_CURRENT_PED_WEAPON
 */
global.SetCurrentPedWeapon = function (ped, weaponHash, bForceInHand) {
	return _in(0x00000000, 0xb8278882, ped, _ch(weaponHash), bForceInHand);
};

/**
 * Sets the coordinates (world position) for a specified entity, offset by the radius of the entity on the Z axis.
 * @param entity The entity to change coordinates for.
 * @param xPos The X coordinate.
 * @param yPos The Y coordinate.
 * @param zPos The Z coordinate, ground level.
 * @param alive Unused by the game, potentially used by debug builds of GTA in order to assert whether or not an entity was alive.
 * @param deadFlag Whether to disable physics for dead peds, too, and not just living peds.
 * @param ragdollFlag A special flag used for ragdolling peds.
 * @param clearArea Whether to clear any entities in the target area.
 */
global.SetEntityCoords = function (entity, xPos, yPos, zPos, alive, deadFlag, ragdollFlag, clearArea) {
	return _in(0x00000000, 0xdf70b41b, entity, _fv(xPos), _fv(yPos), _fv(zPos), alive, deadFlag, ragdollFlag, clearArea);
};

/**
 * It overrides the default distance culling radius of an entity. Set to `0.0` to reset.
 * If you want to interact with an entity outside of your players' scopes set the radius to a huge number.
 * **WARNING**: Culling natives are deprecated and have known, [unfixable issues](https://forum.cfx.re/t/issue-with-culling-radius-and-server-side-entities/4900677/4)
 * @param entity The entity handle to override the distance culling radius.
 * @param radius The new distance culling radius.
 */
global.SetEntityDistanceCullingRadius = function (entity, radius) {
	return _in(0x00000000, 0xd3a183a3, entity, _fv(radius));
};

/**
 * Set the heading of an entity in degrees also known as "Yaw".
 * @param entity The entity to set the heading for.
 * @param heading The heading in degrees.
 */
global.SetEntityHeading = function (entity, heading) {
	return _in(0x00000000, 0xe0ff064d, entity, _fv(heading));
};

/**
 * It allows to flag an entity to ignore the request control filter policy.
 * @param entity The entity handle to ignore the request control filter.
 * @param ignore Define if the entity ignores the request control filter policy.
 */
global.SetEntityIgnoreRequestControlFilter = function (entity, ignore) {
	return _in(0x00000000, 0x9f7f8d36, entity, ignore);
};

/**
 * ```cpp
 * enum EntityOrphanMode {
 * // Default, this will delete the entity when it isn't relevant to any players
 * // NOTE: this *doesn't* mean when they're no longer in scope
 * DeleteWhenNotRelevant = 0,
 * // The entity will be deleted whenever its original owner disconnects
 * // NOTE: if this is set when the entities original owner has already left it will be
 * // marked for deletion (similar to just calling DELETE_ENTITY)
 * DeleteOnOwnerDisconnect = 1,
 * // The entity will never be deleted by the server when it does relevancy checks
 * // you should only use this on entities that need to be relatively persistent
 * KeepEntity = 2
 * }
 * ```
 * Sets what the server will do when the entity no longer has its original owner. By default the server will cleanup entities that it considers "no longer relevant".
 * When used on trains, this native will recursively call onto all attached carriages.
 * **NOTE**: When used with `KeepEntity` (2) this native only guarantees that the ***server*** will not delete the entity, client requests to delete the entity will still work perfectly fine.
 * @param entity The entity to set the orphan mode of
 * @param orphanMode The mode that the server should use for determining if an entity should be removed.
 */
global.SetEntityOrphanMode = function (entity, orphanMode) {
	return _in(0x00000000, 0x489e9162, entity, orphanMode);
};

/**
 * Enables or disables the owner check for the specified entity in network-synchronized scenes. When set to `false`, the entity cannot participate in synced scenes initiated by clients that do not own the entity.
 * By default, this is `false` for all entities, meaning only the entity's owner can include it in networked synchronized scenes.
 * @param entity The entity to set the flag for.
 * @param allow Whether to allow remote synced scenes for the entity.
 */
global.SetEntityRemoteSyncedScenesAllowed = function (entity, allow) {
	return _in(0x00000000, 0xd3fc9d88, entity, allow);
};

/**
 * Sets the rotation of a specified entity in the game world.
 * ```
 * NativeDB Introduced: v323
 * ```
 * @param entity The entity to rotate.
 * @param pitch The pitch (X-axis) rotation in degrees.
 * @param roll The roll (Y-axis) rotation in degrees.
 * @param yaw The yaw (Z-axis) rotation in degrees.
 * @param rotationOrder Specifies the order in which yaw, pitch, and roll are applied, see [`GET_ENTITY_ROTATION`](#\_0xAFBD61CC738D9EB9) for the available rotation orders.
 * @param bDeadCheck Usually set to `true`. Determines whether to check if the entity is dead before applying the rotation.
 */
global.SetEntityRotation = function (entity, pitch, roll, yaw, rotationOrder, bDeadCheck) {
	return _in(0x00000000, 0x0a345efe, entity, _fv(pitch), _fv(roll), _fv(yaw), rotationOrder, bDeadCheck);
};

/**
 * Sets the routing bucket for the specified entity.
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param entity The entity to set the routing bucket for.
 * @param bucket The bucket ID.
 */
global.SetEntityRoutingBucket = function (entity, bucket) {
	return _in(0x00000000, 0x635e5289, entity, bucket);
};

/**
 * Note that the third parameter(denoted as z) is "up and down" with positive numbers encouraging upwards movement.
 */
global.SetEntityVelocity = function (entity, x, y, z) {
	return _in(0x00000000, 0xff5a1988, entity, _fv(x), _fv(y), _fv(z));
};

/**
 * SET_GAME_TYPE
 */
global.SetGameType = function (gametypeName) {
	return _in(0x00000000, 0xf90b7469, _ts(gametypeName));
};

/**
 * Sets the handler for HTTP requests made to the executing resource.
 * Example request URL: `http://localhost:30120/http-test/ping` - this request will be sent to the `http-test` resource with the `/ping` path.
 * The handler function assumes the following signature:
 * ```ts
 * function HttpHandler(
 * request: {
 * address: string;
 * headers: Record<string, string>;
 * method: string;
 * path: string;
 * setDataHandler(handler: (data: string) => void): void;
 * setDataHandler(handler: (data: ArrayBuffer) => void, binary: 'binary'): void;
 * setCancelHandler(handler: () => void): void;
 * },
 * response: {
 * writeHead(code: number, headers?: Record<string, string | string[]>): void;
 * write(data: string): void;
 * send(data?: string): void;
 * }
 * ): void;
 * ```
 * *   **request**: The request object.
 * *   **address**: The IP address of the request sender.
 * *   **path**: The path to where the request was sent.
 * *   **headers**: The headers sent with the request.
 * *   **method**: The request method.
 * *   **setDataHandler**: Sets the handler for when a data body is passed with the request. Additionally you can pass the `'binary'` argument to receive a `BufferArray` in JavaScript or `System.Byte[]` in C# (has no effect in Lua).
 * *   **setCancelHandler**: Sets the handler for when the request is cancelled.
 * *   **response**: An object to control the response.
 * *   **writeHead**: Sets the status code & headers of the response. Can be only called once and won't work if called after running other response functions.
 * *   **write**: Writes to the response body without sending it. Can be called multiple times.
 * *   **send**: Writes to the response body and then sends it along with the status code & headers, finishing the request.
 * @param handler The handler function.
 */
global.SetHttpHandler = function (handler) {
	return _in(0x00000000, 0xf5c6330c, _mfr(handler));
};

/**
 * SET_MAP_NAME
 */
global.SetMapName = function (mapName) {
	return _in(0x00000000, 0xb7ba82dc, _ts(mapName));
};

/**
 * NativeDB Added Parameter 4: BOOL p3
 */
global.SetPedAmmo = function (ped, weaponHash, ammo) {
	return _in(0x00000000, 0xbf90df1a, ped, _ch(weaponHash), ammo);
};

/**
 * Sets the armor of the specified ped.
 * ped: The Ped to set the armor of.
 * amount: A value between 0 and 100 indicating the value to set the Ped's armor to.
 */
global.SetPedArmour = function (ped, amount) {
	return _in(0x00000000, 0x4e3a0cc4, ped, amount);
};

/**
 * SET_PED_CAN_RAGDOLL
 */
global.SetPedCanRagdoll = function (ped, toggle) {
	return _in(0x00000000, 0xcf1384c4, ped, toggle);
};

/**
 * This native is used to set component variation on a ped. Components, drawables and textures IDs are related to the ped model.
 * ### MP Freemode list of components
 * **0**: Face
 * **1**: Mask
 * **2**: Hair
 * **3**: Torso
 * **4**: Leg
 * **5**: Parachute / bag
 * **6**: Shoes
 * **7**: Accessory
 * **8**: Undershirt
 * **9**: Kevlar
 * **10**: Badge
 * **11**: Torso 2
 * List of Component IDs
 * ```cpp
 * // Components
 * enum ePedVarComp
 * {
 * PV_COMP_INVALID = 0xFFFFFFFF,
 * PV_COMP_HEAD = 0, // "HEAD"
 * PV_COMP_BERD = 1, // "BEARD"
 * PV_COMP_HAIR = 2, // "HAIR"
 * PV_COMP_UPPR = 3, // "UPPER"
 * PV_COMP_LOWR = 4, // "LOWER"
 * PV_COMP_HAND = 5, // "HAND"
 * PV_COMP_FEET = 6, // "FEET"
 * PV_COMP_TEEF = 7, // "TEETH"
 * PV_COMP_ACCS = 8, // "ACCESSORIES"
 * PV_COMP_TASK = 9, // "TASK"
 * PV_COMP_DECL = 10, // "DECL"
 * PV_COMP_JBIB = 11, // "JBIB"
 * PV_COMP_MAX = 12,
 * };
 * ```
 * @param ped The ped handle.
 * @param componentId The component that you want to set.
 * @param drawableId The drawable id that is going to be set. Refer to [GET_NUMBER_OF_PED_DRAWABLE_VARIATIONS](#\_0x27561561732A7842).
 * @param textureId The texture id of the drawable. Refer to [GET_NUMBER_OF_PED_TEXTURE_VARIATIONS](#\_0x8F7156A3142A6BAD).
 * @param paletteId 0 to 3.
 */
global.SetPedComponentVariation = function (ped, componentId, drawableId, textureId, paletteId) {
	return _in(0x00000000, 0xd4f7b05c, ped, componentId, drawableId, textureId, paletteId);
};

/**
 * cpp
 * // Potential names and hash collisions included as comments
 * enum ePedConfigFlags {
 * CPED_CONFIG_FLAG_CreatedByFactory = 0,
 * CPED_CONFIG_FLAG_CanBeShotInVehicle = 1,
 * CPED_CONFIG_FLAG_NoCriticalHits = 2,
 * CPED_CONFIG_FLAG_DrownsInWater = 3,
 * CPED_CONFIG_FLAG_DrownsInSinkingVehicle = 4,
 * CPED_CONFIG_FLAG_DiesInstantlyWhenSwimming = 5,
 * CPED_CONFIG_FLAG_HasBulletProofVest = 6,
 * CPED_CONFIG_FLAG_UpperBodyDamageAnimsOnly = 7,
 * CPED_CONFIG_FLAG_NeverFallOffSkis = 8,
 * CPED_CONFIG_FLAG_NeverEverTargetThisPed = 9,
 * CPED_CONFIG_FLAG_ThisPedIsATargetPriority = 10,
 * CPED_CONFIG_FLAG_TargettableWithNoLos = 11,
 * CPED_CONFIG_FLAG_DoesntListenToPlayerGroupCommands = 12,
 * CPED_CONFIG_FLAG_NeverLeavesGroup = 13,
 * CPED_CONFIG_FLAG_DoesntDropWeaponsWhenDead = 14,
 * CPED_CONFIG_FLAG_SetDelayedWeaponAsCurrent = 15,
 * CPED_CONFIG_FLAG_KeepTasksAfterCleanUp = 16,
 * CPED_CONFIG_FLAG_BlockNonTemporaryEvents = 17,
 * CPED_CONFIG_FLAG_HasAScriptBrain = 18,
 * CPED_CONFIG_FLAG_WaitingForScriptBrainToLoad = 19,
 * CPED_CONFIG_FLAG_AllowMedicsToReviveMe = 20,
 * CPED_CONFIG_FLAG_MoneyHasBeenGivenByScript = 21,
 * CPED_CONFIG_FLAG_NotAllowedToCrouch = 22,
 * CPED_CONFIG_FLAG_DeathPickupsPersist = 23,
 * CPED_CONFIG_FLAG_IgnoreSeenMelee = 24,
 * CPED_CONFIG_FLAG_ForceDieIfInjured = 25,
 * CPED_CONFIG_FLAG_DontDragMeOutCar = 26,
 * CPED_CONFIG_FLAG_StayInCarOnJack = 27,
 * CPED_CONFIG_FLAG_ForceDieInCar = 28,
 * CPED_CONFIG_FLAG_GetOutUndriveableVehicle = 29,
 * CPED_CONFIG_FLAG_WillRemainOnBoatAfterMissionEnds = 30,
 * CPED_CONFIG_FLAG_DontStoreAsPersistent = 31,
 * CPED_CONFIG_FLAG_WillFlyThroughWindscreen = 32,
 * CPED_CONFIG_FLAG_DieWhenRagdoll = 33,
 * CPED_CONFIG_FLAG_HasHelmet = 34,
 * CPED_CONFIG_FLAG_UseHelmet = 35,
 * CPED_CONFIG_FLAG_DontTakeOffHelmet = 36,
 * CPED_CONFIG_FLAG_HideInCutscene = 37,
 * CPED_CONFIG_FLAG_PedIsEnemyToPlayer = 38,
 * CPED_CONFIG_FLAG_DisableEvasiveDives = 39,
 * CPED_CONFIG_FLAG_PedGeneratesDeadBodyEvents = 40,
 * CPED_CONFIG_FLAG_DontAttackPlayerWithoutWantedLevel = 41,
 * CPED_CONFIG_FLAG_DontInfluenceWantedLevel = 42,
 * CPED_CONFIG_FLAG_DisablePlayerLockon = 43,
 * CPED_CONFIG_FLAG_DisableLockonToRandomPeds = 44,
 * CPED_CONFIG_FLAG_AllowLockonToFriendlyPlayers = 45,
 * _0xDB115BFA = 46,
 * CPED_CONFIG_FLAG_PedBeingDeleted = 47,
 * CPED_CONFIG_FLAG_BlockWeaponSwitching = 48,
 * CPED_CONFIG_FLAG_BlockGroupPedAimedAtResponse = 49,
 * CPED_CONFIG_FLAG_WillFollowLeaderAnyMeans = 50,
 * CPED_CONFIG_FLAG_BlippedByScript = 51,
 * CPED_CONFIG_FLAG_DrawRadarVisualField = 52,
 * CPED_CONFIG_FLAG_StopWeaponFiringOnImpact = 53,
 * CPED_CONFIG_FLAG_DissableAutoFallOffTests = 54,
 * CPED_CONFIG_FLAG_SteerAroundDeadBodies = 55,
 * CPED_CONFIG_FLAG_ConstrainToNavMesh = 56,
 * CPED_CONFIG_FLAG_SyncingAnimatedProps = 57,
 * CPED_CONFIG_FLAG_IsFiring = 58,
 * CPED_CONFIG_FLAG_WasFiring = 59,
 * CPED_CONFIG_FLAG_IsStanding = 60,
 * CPED_CONFIG_FLAG_WasStanding = 61,
 * CPED_CONFIG_FLAG_InVehicle = 62,
 * CPED_CONFIG_FLAG_OnMount = 63,
 * CPED_CONFIG_FLAG_AttachedToVehicle = 64,
 * CPED_CONFIG_FLAG_IsSwimming = 65,
 * CPED_CONFIG_FLAG_WasSwimming = 66,
 * CPED_CONFIG_FLAG_IsSkiing = 67,
 * CPED_CONFIG_FLAG_IsSitting = 68,
 * CPED_CONFIG_FLAG_KilledByStealth = 69,
 * CPED_CONFIG_FLAG_KilledByTakedown = 70,
 * CPED_CONFIG_FLAG_Knockedout = 71,
 * CPED_CONFIG_FLAG_ClearRadarBlipOnDeath = 72,
 * CPED_CONFIG_FLAG_JustGotOffTrain = 73,
 * CPED_CONFIG_FLAG_JustGotOnTrain = 74,
 * CPED_CONFIG_FLAG_UsingCoverPoint = 75,
 * CPED_CONFIG_FLAG_IsInTheAir = 76,
 * CPED_CONFIG_FLAG_KnockedUpIntoAir = 77,
 * CPED_CONFIG_FLAG_IsAimingGun = 78,
 * CPED_CONFIG_FLAG_HasJustLeftCar = 79,
 * CPED_CONFIG_FLAG_TargetWhenInjuredAllowed = 80,
 * CPED_CONFIG_FLAG_CurrLeftFootCollNM = 81,
 * CPED_CONFIG_FLAG_PrevLeftFootCollNM = 82,
 * CPED_CONFIG_FLAG_CurrRightFootCollNM = 83,
 * CPED_CONFIG_FLAG_PrevRightFootCollNM = 84,
 * CPED_CONFIG_FLAG_HasBeenBumpedInCar = 85,
 * CPED_CONFIG_FLAG_InWaterTaskQuitToClimbLadder = 86,
 * CPED_CONFIG_FLAG_NMTwoHandedWeaponBothHandsConstrained = 87,
 * CPED_CONFIG_FLAG_CreatedBloodPoolTimer = 88,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromAnyPedImpact = 89,
 * CPED_CONFIG_FLAG_GroupPedFailedToEnterCover = 90,
 * CPED_CONFIG_FLAG_AlreadyChattedOnPhone = 91,
 * CPED_CONFIG_FLAG_AlreadyReactedToPedOnRoof = 92,
 * CPED_CONFIG_FLAG_ForcePedLoadCover = 93,
 * CPED_CONFIG_FLAG_BlockCoweringInCover = 94,
 * CPED_CONFIG_FLAG_BlockPeekingInCover = 95,
 * CPED_CONFIG_FLAG_JustLeftCarNotCheckedForDoors = 96,
 * CPED_CONFIG_FLAG_VaultFromCover = 97,
 * CPED_CONFIG_FLAG_AutoConversationLookAts = 98,
 * CPED_CONFIG_FLAG_UsingCrouchedPedCapsule = 99,
 * CPED_CONFIG_FLAG_HasDeadPedBeenReported = 100,
 * CPED_CONFIG_FLAG_ForcedAim = 101,
 * CPED_CONFIG_FLAG_SteersAroundPeds = 102,
 * CPED_CONFIG_FLAG_SteersAroundObjects = 103,
 * CPED_CONFIG_FLAG_OpenDoorArmIK = 104,
 * CPED_CONFIG_FLAG_ForceReload = 105,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromVehicleImpact = 106,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromBulletImpact = 107,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromExplosions = 108,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromFire = 109,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromElectrocution = 110,
 * CPED_CONFIG_FLAG_IsBeingDraggedToSafety = 111,
 * CPED_CONFIG_FLAG_HasBeenDraggedToSafety = 112,
 * CPED_CONFIG_FLAG_KeepWeaponHolsteredUnlessFired = 113,
 * CPED_CONFIG_FLAG_ForceScriptControlledKnockout = 114,
 * CPED_CONFIG_FLAG_FallOutOfVehicleWhenKilled = 115,
 * CPED_CONFIG_FLAG_GetOutBurningVehicle = 116,
 * CPED_CONFIG_FLAG_BumpedByPlayer = 117,
 * CPED_CONFIG_FLAG_RunFromFiresAndExplosions = 118,
 * CPED_CONFIG_FLAG_TreatAsPlayerDuringTargeting = 119,
 * CPED_CONFIG_FLAG_IsHandCuffed = 120,
 * CPED_CONFIG_FLAG_IsAnkleCuffed = 121,
 * CPED_CONFIG_FLAG_DisableMelee = 122,
 * CPED_CONFIG_FLAG_DisableUnarmedDrivebys = 123,
 * CPED_CONFIG_FLAG_JustGetsPulledOutWhenElectrocuted = 124,
 * CPED_CONFIG_FLAG_UNUSED_REPLACE_ME = 125,
 * CPED_CONFIG_FLAG_WillNotHotwireLawEnforcementVehicle = 126,
 * CPED_CONFIG_FLAG_WillCommandeerRatherThanJack = 127,
 * CPED_CONFIG_FLAG_CanBeAgitated = 128,
 * CPED_CONFIG_FLAG_ForcePedToFaceLeftInCover = 129,
 * CPED_CONFIG_FLAG_ForcePedToFaceRightInCover = 130,
 * CPED_CONFIG_FLAG_BlockPedFromTurningInCover = 131,
 * CPED_CONFIG_FLAG_KeepRelationshipGroupAfterCleanUp = 132,
 * CPED_CONFIG_FLAG_ForcePedToBeDragged = 133,
 * CPED_CONFIG_FLAG_PreventPedFromReactingToBeingJacked = 134,
 * CPED_CONFIG_FLAG_IsScuba = 135,
 * CPED_CONFIG_FLAG_WillArrestRatherThanJack = 136,
 * CPED_CONFIG_FLAG_RemoveDeadExtraFarAway = 137,
 * CPED_CONFIG_FLAG_RidingTrain = 138,
 * CPED_CONFIG_FLAG_ArrestResult = 139,
 * CPED_CONFIG_FLAG_CanAttackFriendly = 140,
 * CPED_CONFIG_FLAG_WillJackAnyPlayer = 141,
 * CPED_CONFIG_FLAG_BumpedByPlayerVehicle = 142,
 * CPED_CONFIG_FLAG_DodgedPlayerVehicle = 143,
 * CPED_CONFIG_FLAG_WillJackWantedPlayersRatherThanStealCar = 144,
 * CPED_CONFIG_FLAG_NoCopWantedAggro = 145,
 * CPED_CONFIG_FLAG_DisableLadderClimbing = 146,
 * CPED_CONFIG_FLAG_StairsDetected = 147,
 * CPED_CONFIG_FLAG_SlopeDetected = 148,
 * CPED_CONFIG_FLAG_HelmetHasBeenShot = 149,
 * CPED_CONFIG_FLAG_CowerInsteadOfFlee = 150,
 * CPED_CONFIG_FLAG_CanActivateRagdollWhenVehicleUpsideDown = 151,
 * CPED_CONFIG_FLAG_AlwaysRespondToCriesForHelp = 152,
 * CPED_CONFIG_FLAG_DisableBloodPoolCreation = 153,
 * CPED_CONFIG_FLAG_ShouldFixIfNoCollision = 154,
 * CPED_CONFIG_FLAG_CanPerformArrest = 155,
 * CPED_CONFIG_FLAG_CanPerformUncuff = 156,
 * CPED_CONFIG_FLAG_CanBeArrested = 157,
 * CPED_CONFIG_FLAG_MoverConstrictedByOpposingCollisions = 158,
 * CPED_CONFIG_FLAG_PlayerPreferFrontSeatMP = 159,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromImpactObject = 160,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromMelee = 161,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromWaterJet = 162,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromDrowning = 163,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromFalling = 164,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromRubberBullet = 165,
 * CPED_CONFIG_FLAG_IsInjured = 166,
 * CPED_CONFIG_FLAG_DontEnterVehiclesInPlayersGroup = 167,
 * CPED_CONFIG_FLAG_SwimmingTasksRunning = 168,
 * CPED_CONFIG_FLAG_PreventAllMeleeTaunts = 169,
 * CPED_CONFIG_FLAG_ForceDirectEntry = 170,
 * CPED_CONFIG_FLAG_AlwaysSeeApproachingVehicles = 171,
 * CPED_CONFIG_FLAG_CanDiveAwayFromApproachingVehicles = 172,
 * CPED_CONFIG_FLAG_AllowPlayerToInterruptVehicleEntryExit = 173,
 * CPED_CONFIG_FLAG_OnlyAttackLawIfPlayerIsWanted = 174,
 * CPED_CONFIG_FLAG_PlayerInContactWithKinematicPed = 175,
 * CPED_CONFIG_FLAG_PlayerInContactWithSomethingOtherThanKinematicPed = 176,
 * CPED_CONFIG_FLAG_PedsJackingMeDontGetIn = 177,
 * CPED_CONFIG_FLAG_AdditionalRappellingPed = 178,
 * CPED_CONFIG_FLAG_PedIgnoresAnimInterruptEvents = 179,
 * CPED_CONFIG_FLAG_IsInCustody = 180,
 * CPED_CONFIG_FLAG_ForceStandardBumpReactionThresholds = 181,
 * CPED_CONFIG_FLAG_LawWillOnlyAttackIfPlayerIsWanted = 182,
 * CPED_CONFIG_FLAG_IsAgitated = 183,
 * CPED_CONFIG_FLAG_PreventAutoShuffleToDriversSeat = 184,
 * CPED_CONFIG_FLAG_UseKinematicModeWhenStationary = 185,
 * CPED_CONFIG_FLAG_EnableWeaponBlocking = 186,
 * CPED_CONFIG_FLAG_HasHurtStarted = 187,
 * CPED_CONFIG_FLAG_DisableHurt = 188,
 * CPED_CONFIG_FLAG_PlayerIsWeird = 189,
 * CPED_CONFIG_FLAG_PedHadPhoneConversation = 190,
 * CPED_CONFIG_FLAG_BeganCrossingRoad = 191,
 * CPED_CONFIG_FLAG_WarpIntoLeadersVehicle = 192,
 * CPED_CONFIG_FLAG_DoNothingWhenOnFootByDefault = 193,
 * CPED_CONFIG_FLAG_UsingScenario = 194,
 * CPED_CONFIG_FLAG_VisibleOnScreen = 195,
 * CPED_CONFIG_FLAG_DontCollideWithKinematic = 196,
 * CPED_CONFIG_FLAG_ActivateOnSwitchFromLowPhysicsLod = 197,
 * CPED_CONFIG_FLAG_DontActivateRagdollOnPedCollisionWhenDead = 198,
 * CPED_CONFIG_FLAG_DontActivateRagdollOnVehicleCollisionWhenDead = 199,
 * CPED_CONFIG_FLAG_HasBeenInArmedCombat = 200,
 * CPED_CONFIG_FLAG_UseDiminishingAmmoRate = 201,
 * CPED_CONFIG_FLAG_Avoidance_Ignore_All = 202,
 * CPED_CONFIG_FLAG_Avoidance_Ignored_by_All = 203,
 * CPED_CONFIG_FLAG_Avoidance_Ignore_Group1 = 204,
 * CPED_CONFIG_FLAG_Avoidance_Member_of_Group1 = 205,
 * CPED_CONFIG_FLAG_ForcedToUseSpecificGroupSeatIndex = 206,
 * CPED_CONFIG_FLAG_LowPhysicsLodMayPlaceOnNavMesh = 207,
 * CPED_CONFIG_FLAG_DisableExplosionReactions = 208,
 * CPED_CONFIG_FLAG_DodgedPlayer = 209,
 * CPED_CONFIG_FLAG_WaitingForPlayerControlInterrupt = 210,
 * CPED_CONFIG_FLAG_ForcedToStayInCover = 211,
 * CPED_CONFIG_FLAG_GeneratesSoundEvents = 212,
 * CPED_CONFIG_FLAG_ListensToSoundEvents = 213,
 * CPED_CONFIG_FLAG_AllowToBeTargetedInAVehicle = 214,
 * CPED_CONFIG_FLAG_WaitForDirectEntryPointToBeFreeWhenExiting = 215,
 * CPED_CONFIG_FLAG_OnlyRequireOnePressToExitVehicle = 216,
 * CPED_CONFIG_FLAG_ForceExitToSkyDive = 217,
 * CPED_CONFIG_FLAG_SteersAroundVehicles = 218,
 * CPED_CONFIG_FLAG_AllowPedInVehiclesOverrideTaskFlags = 219,
 * CPED_CONFIG_FLAG_DontEnterLeadersVehicle = 220,
 * CPED_CONFIG_FLAG_DisableExitToSkyDive = 221,
 * CPED_CONFIG_FLAG_ScriptHasDisabledCollision = 222,
 * CPED_CONFIG_FLAG_UseAmbientModelScaling = 223,
 * CPED_CONFIG_FLAG_DontWatchFirstOnNextHurryAway = 224,
 * CPED_CONFIG_FLAG_DisablePotentialToBeWalkedIntoResponse = 225,
 * CPED_CONFIG_FLAG_DisablePedAvoidance = 226,
 * CPED_CONFIG_FLAG_ForceRagdollUponDeath = 227,
 * CPED_CONFIG_FLAG_CanLosePropsOnDamage = 228,
 * CPED_CONFIG_FLAG_DisablePanicInVehicle = 229,
 * CPED_CONFIG_FLAG_AllowedToDetachTrailer = 230,
 * CPED_CONFIG_FLAG_HasShotBeenReactedToFromFront = 231,
 * CPED_CONFIG_FLAG_HasShotBeenReactedToFromBack = 232,
 * CPED_CONFIG_FLAG_HasShotBeenReactedToFromLeft = 233,
 * CPED_CONFIG_FLAG_HasShotBeenReactedToFromRight = 234,
 * CPED_CONFIG_FLAG_AllowBlockDeadPedRagdollActivation = 235,
 * CPED_CONFIG_FLAG_IsHoldingProp = 236,
 * CPED_CONFIG_FLAG_BlocksPathingWhenDead = 237,
 * CPED_CONFIG_FLAG_ForcePlayNormalScenarioExitOnNextScriptCommand = 238,
 * CPED_CONFIG_FLAG_ForcePlayImmediateScenarioExitOnNextScriptCommand = 239,
 * CPED_CONFIG_FLAG_ForceSkinCharacterCloth = 240,
 * CPED_CONFIG_FLAG_LeaveEngineOnWhenExitingVehicles = 241,
 * CPED_CONFIG_FLAG_PhoneDisableTextingAnimations = 242,
 * CPED_CONFIG_FLAG_PhoneDisableTalkingAnimations = 243,
 * CPED_CONFIG_FLAG_PhoneDisableCameraAnimations = 244,
 * CPED_CONFIG_FLAG_DisableBlindFiringInShotReactions = 245,
 * CPED_CONFIG_FLAG_AllowNearbyCoverUsage = 246,
 * CPED_CONFIG_FLAG_InStrafeTransition = 247,
 * CPED_CONFIG_FLAG_CanPlayInCarIdles = 248,
 * CPED_CONFIG_FLAG_CanAttackNonWantedPlayerAsLaw = 249,
 * CPED_CONFIG_FLAG_WillTakeDamageWhenVehicleCrashes = 250,
 * CPED_CONFIG_FLAG_AICanDrivePlayerAsRearPassenger = 251,
 * CPED_CONFIG_FLAG_PlayerCanJackFriendlyPlayers = 252,
 * CPED_CONFIG_FLAG_OnStairs = 253,
 * CPED_CONFIG_FLAG_SimulatingAiming = 254,
 * CPED_CONFIG_FLAG_AIDriverAllowFriendlyPassengerSeatEntry = 255,
 * CPED_CONFIG_FLAG_ParentCarIsBeingRemoved = 256,
 * CPED_CONFIG_FLAG_AllowMissionPedToUseInjuredMovement = 257,
 * CPED_CONFIG_FLAG_CanLoseHelmetOnDamage = 258,
 * CPED_CONFIG_FLAG_NeverDoScenarioExitProbeChecks = 259,
 * CPED_CONFIG_FLAG_SuppressLowLODRagdollSwitchWhenCorpseSettles = 260,
 * CPED_CONFIG_FLAG_PreventUsingLowerPrioritySeats = 261,
 * CPED_CONFIG_FLAG_JustLeftVehicleNeedsReset = 262,
 * CPED_CONFIG_FLAG_TeleportIfCantReachPlayer = 263,
 * CPED_CONFIG_FLAG_PedsInVehiclePositionNeedsReset = 264,
 * CPED_CONFIG_FLAG_PedsFullyInSeat = 265,
 * CPED_CONFIG_FLAG_AllowPlayerLockOnIfFriendly = 266,
 * CPED_CONFIG_FLAG_UseCameraHeadingForDesiredDirectionLockOnTest = 267,
 * CPED_CONFIG_FLAG_TeleportToLeaderVehicle = 268,
 * CPED_CONFIG_FLAG_Avoidance_Ignore_WeirdPedBuffer = 269,
 * CPED_CONFIG_FLAG_OnStairSlope = 270,
 * CPED_CONFIG_FLAG_HasPlayedNMGetup = 271,
 * CPED_CONFIG_FLAG_DontBlipCop = 272,
 * CPED_CONFIG_FLAG_SpawnedAtExtendedRangeScenario = 273,
 * CPED_CONFIG_FLAG_WalkAlongsideLeaderWhenClose = 274,
 * CPED_CONFIG_FLAG_KillWhenTrapped = 275,
 * CPED_CONFIG_FLAG_EdgeDetected = 276,
 * CPED_CONFIG_FLAG_AlwaysWakeUpPhysicsOfIntersectedPeds = 277,
 * CPED_CONFIG_FLAG_EquippedAmbientLoadOutWeapon = 278,
 * CPED_CONFIG_FLAG_AvoidTearGas = 279,
 * CPED_CONFIG_FLAG_StoppedSpeechUponFreezing = 280,
 * CPED_CONFIG_FLAG_DisableGoToWritheWhenInjured = 281,
 * CPED_CONFIG_FLAG_OnlyUseForcedSeatWhenEnteringHeliInGroup = 282,
 * CPED_CONFIG_FLAG_ThrownFromVehicleDueToExhaustion = 283,
 * CPED_CONFIG_FLAG_UpdateEnclosedSearchRegion = 284,
 * CPED_CONFIG_FLAG_DisableWeirdPedEvents = 285,
 * CPED_CONFIG_FLAG_ShouldChargeNow = 286,
 * CPED_CONFIG_FLAG_RagdollingOnBoat = 287,
 * CPED_CONFIG_FLAG_HasBrandishedWeapon = 288,
 * CPED_CONFIG_FLAG_AllowMinorReactionsAsMissionPed = 289,
 * CPED_CONFIG_FLAG_BlockDeadBodyShockingEventsWhenDead = 290,
 * CPED_CONFIG_FLAG_PedHasBeenSeen = 291,
 * CPED_CONFIG_FLAG_PedIsInReusePool = 292,
 * CPED_CONFIG_FLAG_PedWasReused = 293,
 * CPED_CONFIG_FLAG_DisableShockingEvents = 294,
 * CPED_CONFIG_FLAG_MovedUsingLowLodPhysicsSinceLastActive = 295,
 * CPED_CONFIG_FLAG_NeverReactToPedOnRoof = 296,
 * CPED_CONFIG_FLAG_ForcePlayFleeScenarioExitOnNextScriptCommand = 297,
 * CPED_CONFIG_FLAG_JustBumpedIntoVehicle = 298,
 * CPED_CONFIG_FLAG_DisableShockingDrivingOnPavementEvents = 299,
 * CPED_CONFIG_FLAG_ShouldThrowSmokeNow = 300,
 * CPED_CONFIG_FLAG_DisablePedConstraints = 301,
 * CPED_CONFIG_FLAG_ForceInitialPeekInCover = 302,
 * CPED_CONFIG_FLAG_CreatedByDispatch = 303,
 * CPED_CONFIG_FLAG_PointGunLeftHandSupporting = 304,
 * CPED_CONFIG_FLAG_DisableJumpingFromVehiclesAfterLeader = 305,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromPlayerPedImpact = 306,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromAiRagdollImpact = 307,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromPlayerRagdollImpact = 308,
 * CPED_CONFIG_FLAG_DisableQuadrupedSpring = 309,
 * CPED_CONFIG_FLAG_IsInCluster = 310,
 * CPED_CONFIG_FLAG_ShoutToGroupOnPlayerMelee = 311,
 * CPED_CONFIG_FLAG_IgnoredByAutoOpenDoors = 312,
 * CPED_CONFIG_FLAG_PreferInjuredGetup = 313,
 * CPED_CONFIG_FLAG_ForceIgnoreMeleeActiveCombatant = 314,
 * CPED_CONFIG_FLAG_CheckLoSForSoundEvents = 315,
 * CPED_CONFIG_FLAG_JackedAbandonedCar = 316,
 * CPED_CONFIG_FLAG_CanSayFollowedByPlayerAudio = 317,
 * CPED_CONFIG_FLAG_ActivateRagdollFromMinorPlayerContact = 318,
 * CPED_CONFIG_FLAG_HasPortablePickupAttached = 319,
 * CPED_CONFIG_FLAG_ForcePoseCharacterCloth = 320,
 * CPED_CONFIG_FLAG_HasClothCollisionBounds = 321,
 * CPED_CONFIG_FLAG_HasHighHeels = 322,
 * CPED_CONFIG_FLAG_TreatAsAmbientPedForDriverLockOn = 323,
 * CPED_CONFIG_FLAG_DontBehaveLikeLaw = 324,
 * CPED_CONFIG_FLAG_SpawnedAtScenario = 325,
 * CPED_CONFIG_FLAG_DisablePoliceInvestigatingBody = 326,
 * CPED_CONFIG_FLAG_DisableWritheShootFromGround = 327,
 * CPED_CONFIG_FLAG_LowerPriorityOfWarpSeats = 328,
 * CPED_CONFIG_FLAG_DisableTalkTo = 329,
 * CPED_CONFIG_FLAG_DontBlip = 330,
 * CPED_CONFIG_FLAG_IsSwitchingWeapon = 331,
 * CPED_CONFIG_FLAG_IgnoreLegIkRestrictions = 332,
 * CPED_CONFIG_FLAG_ScriptForceNoTimesliceIntelligenceUpdate = 333,
 * CPED_CONFIG_FLAG_JackedOutOfMyVehicle = 334,
 * CPED_CONFIG_FLAG_WentIntoCombatAfterBeingJacked = 335,
 * CPED_CONFIG_FLAG_DontActivateRagdollForVehicleGrab = 336,
 * CPED_CONFIG_FLAG_ForcePackageCharacterCloth = 337,
 * CPED_CONFIG_FLAG_DontRemoveWithValidOrder = 338,
 * CPED_CONFIG_FLAG_AllowTaskDoNothingTimeslicing = 339,
 * CPED_CONFIG_FLAG_ForcedToStayInCoverDueToPlayerSwitch = 340,
 * CPED_CONFIG_FLAG_ForceProneCharacterCloth = 341,
 * CPED_CONFIG_FLAG_NotAllowedToJackAnyPlayers = 342,
 * CPED_CONFIG_FLAG_InToStrafeTransition = 343,
 * CPED_CONFIG_FLAG_KilledByStandardMelee = 344,
 * CPED_CONFIG_FLAG_AlwaysLeaveTrainUponArrival = 345,
 * CPED_CONFIG_FLAG_ForcePlayDirectedNormalScenarioExitOnNextScriptCommand = 346,
 * CPED_CONFIG_FLAG_OnlyWritheFromWeaponDamage = 347,
 * CPED_CONFIG_FLAG_UseSloMoBloodVfx = 348,
 * CPED_CONFIG_FLAG_EquipJetpack = 349,
 * CPED_CONFIG_FLAG_PreventDraggedOutOfCarThreatResponse = 350,
 * CPED_CONFIG_FLAG_ScriptHasCompletelyDisabledCollision = 351,
 * CPED_CONFIG_FLAG_NeverDoScenarioNavChecks = 352,
 * CPED_CONFIG_FLAG_ForceSynchronousScenarioExitChecking = 353,
 * CPED_CONFIG_FLAG_ThrowingGrenadeWhileAiming = 354,
 * CPED_CONFIG_FLAG_HeadbobToRadioEnabled = 355,
 * CPED_CONFIG_FLAG_ForceDeepSurfaceCheck = 356,
 * CPED_CONFIG_FLAG_DisableDeepSurfaceAnims = 357,
 * CPED_CONFIG_FLAG_DontBlipNotSynced = 358,
 * CPED_CONFIG_FLAG_IsDuckingInVehicle = 359,
 * CPED_CONFIG_FLAG_PreventAutoShuffleToTurretSeat = 360,
 * CPED_CONFIG_FLAG_DisableEventInteriorStatusCheck = 361,
 * CPED_CONFIG_FLAG_HasReserveParachute = 362,
 * CPED_CONFIG_FLAG_UseReserveParachute = 363,
 * CPED_CONFIG_FLAG_TreatDislikeAsHateWhenInCombat = 364,
 * CPED_CONFIG_FLAG_OnlyUpdateTargetWantedIfSeen = 365,
 * CPED_CONFIG_FLAG_AllowAutoShuffleToDriversSeat = 366,
 * CPED_CONFIG_FLAG_DontActivateRagdollFromSmokeGrenade = 367,
 * CPED_CONFIG_FLAG_LinkMBRToOwnerOnChain = 368,
 * CPED_CONFIG_FLAG_AmbientFriendBumpedByPlayer = 369,
 * CPED_CONFIG_FLAG_AmbientFriendBumpedByPlayerVehicle = 370,
 * CPED_CONFIG_FLAG_InFPSUnholsterTransition = 371,
 * CPED_CONFIG_FLAG_PreventReactingToSilencedCloneBullets = 372,
 * CPED_CONFIG_FLAG_DisableInjuredCryForHelpEvents = 373,
 * CPED_CONFIG_FLAG_NeverLeaveTrain = 374,
 * CPED_CONFIG_FLAG_DontDropJetpackOnDeath = 375,
 * CPED_CONFIG_FLAG_UseFPSUnholsterTransitionDuringCombatRoll = 376,
 * CPED_CONFIG_FLAG_ExitingFPSCombatRoll = 377,
 * CPED_CONFIG_FLAG_ScriptHasControlOfPlayer = 378,
 * CPED_CONFIG_FLAG_PlayFPSIdleFidgetsForProjectile = 379,
 * CPED_CONFIG_FLAG_DisableAutoEquipHelmetsInBikes = 380,
 * CPED_CONFIG_FLAG_DisableAutoEquipHelmetsInAircraft = 381,
 * CPED_CONFIG_FLAG_WasPlayingFPSGetup = 382,
 * CPED_CONFIG_FLAG_WasPlayingFPSMeleeActionResult = 383,
 * CPED_CONFIG_FLAG_PreferNoPriorityRemoval = 384,
 * CPED_CONFIG_FLAG_FPSFidgetsAbortedOnFire = 385,
 * CPED_CONFIG_FLAG_ForceFPSIKWithUpperBodyAnim = 386,
 * CPED_CONFIG_FLAG_SwitchingCharactersInFirstPerson = 387,
 * CPED_CONFIG_FLAG_IsClimbingLadder = 388,
 * CPED_CONFIG_FLAG_HasBareFeet = 389,
 * CPED_CONFIG_FLAG_UNUSED_REPLACE_ME_2 = 390,
 * CPED_CONFIG_FLAG_GoOnWithoutVehicleIfItIsUnableToGetBackToRoad = 391,
 * CPED_CONFIG_FLAG_BlockDroppingHealthSnacksOnDeath = 392,
 * CPED_CONFIG_FLAG_ResetLastVehicleOnVehicleExit = 393,
 * CPED_CONFIG_FLAG_ForceThreatResponseToNonFriendToFriendMeleeActions = 394,
 * CPED_CONFIG_FLAG_DontRespondToRandomPedsDamage = 395,
 * CPED_CONFIG_FLAG_AllowContinuousThreatResponseWantedLevelUpdates = 396,
 * CPED_CONFIG_FLAG_KeepTargetLossResponseOnCleanup = 397,
 * CPED_CONFIG_FLAG_PlayersDontDragMeOutOfCar = 398,
 * CPED_CONFIG_FLAG_BroadcastRepondedToThreatWhenGoingToPointShooting = 399,
 * CPED_CONFIG_FLAG_IgnorePedTypeForIsFriendlyWith = 400,
 * CPED_CONFIG_FLAG_TreatNonFriendlyAsHateWhenInCombat = 401,
 * CPED_CONFIG_FLAG_DontLeaveVehicleIfLeaderNotInVehicle = 402,
 * CPED_CONFIG_FLAG_ChangeFromPermanentToAmbientPopTypeOnMigration = 403,
 * CPED_CONFIG_FLAG_AllowMeleeReactionIfMeleeProofIsOn = 404,
 * CPED_CONFIG_FLAG_UsingLowriderLeans = 405,
 * CPED_CONFIG_FLAG_UsingAlternateLowriderLeans = 406,
 * CPED_CONFIG_FLAG_UseNormalExplosionDamageWhenBlownUpInVehicle = 407,
 * CPED_CONFIG_FLAG_DisableHomingMissileLockForVehiclePedInside = 408,
 * CPED_CONFIG_FLAG_DisableTakeOffScubaGear = 409,
 * CPED_CONFIG_FLAG_IgnoreMeleeFistWeaponDamageMult = 410,
 * CPED_CONFIG_FLAG_LawPedsCanFleeFromNonWantedPlayer = 411,
 * CPED_CONFIG_FLAG_ForceBlipSecurityPedsIfPlayerIsWanted = 412,
 * CPED_CONFIG_FLAG_IsHolsteringWeapon = 413,
 * CPED_CONFIG_FLAG_UseGoToPointForScenarioNavigation = 414,
 * CPED_CONFIG_FLAG_DontClearLocalPassengersWantedLevel = 415,
 * CPED_CONFIG_FLAG_BlockAutoSwapOnWeaponPickups = 416,
 * CPED_CONFIG_FLAG_ThisPedIsATargetPriorityForAI = 417,
 * CPED_CONFIG_FLAG_IsSwitchingHelmetVisor = 418,
 * CPED_CONFIG_FLAG_ForceHelmetVisorSwitch = 419,
 * CPED_CONFIG_FLAG_IsPerformingVehicleMelee = 420,
 * CPED_CONFIG_FLAG_UseOverrideFootstepPtFx = 421,
 * CPED_CONFIG_FLAG_DisableVehicleCombat = 422,
 * CPED_CONFIG_FLAG_TreatAsFriendlyForTargetingAndDamage = 423,
 * CPED_CONFIG_FLAG_AllowBikeAlternateAnimations = 424,
 * CPED_CONFIG_FLAG_TreatAsFriendlyForTargetingAndDamageNonSynced = 425,
 * CPED_CONFIG_FLAG_UseLockpickVehicleEntryAnimations = 426,
 * CPED_CONFIG_FLAG_IgnoreInteriorCheckForSprinting = 427,
 * CPED_CONFIG_FLAG_SwatHeliSpawnWithinLastSpottedLocation = 428,
 * CPED_CONFIG_FLAG_DisableStartEngine = 429,
 * CPED_CONFIG_FLAG_IgnoreBeingOnFire = 430,
 * CPED_CONFIG_FLAG_DisableTurretOrRearSeatPreference = 431,
 * CPED_CONFIG_FLAG_DisableWantedHelicopterSpawning = 432,
 * CPED_CONFIG_FLAG_UseTargetPerceptionForCreatingAimedAtEvents = 433,
 * CPED_CONFIG_FLAG_DisableHomingMissileLockon = 434,
 * CPED_CONFIG_FLAG_ForceIgnoreMaxMeleeActiveSupportCombatants = 435,
 * CPED_CONFIG_FLAG_StayInDefensiveAreaWhenInVehicle = 436,
 * CPED_CONFIG_FLAG_DontShoutTargetPosition = 437,
 * CPED_CONFIG_FLAG_DisableHelmetArmor = 438,
 * CPED_CONFIG_FLAG_CreatedByConcealedPlayer = 439,
 * CPED_CONFIG_FLAG_PermanentlyDisablePotentialToBeWalkedIntoResponse = 440,
 * CPED_CONFIG_FLAG_PreventVehExitDueToInvalidWeapon = 441,
 * CPED_CONFIG_FLAG_IgnoreNetSessionFriendlyFireCheckForAllowDamage = 442,
 * CPED_CONFIG_FLAG_DontLeaveCombatIfTargetPlayerIsAttackedByPolice = 443,
 * CPED_CONFIG_FLAG_CheckLockedBeforeWarp = 444,
 * CPED_CONFIG_FLAG_DontShuffleInVehicleToMakeRoom = 445,
 * CPED_CONFIG_FLAG_GiveWeaponOnGetup = 446,
 * CPED_CONFIG_FLAG_DontHitVehicleWithProjectiles = 447,
 * CPED_CONFIG_FLAG_DisableForcedEntryForOpenVehiclesFromTryLockedDoor = 448,
 * CPED_CONFIG_FLAG_FiresDummyRockets = 449,
 * CPED_CONFIG_FLAG_PedIsArresting = 450,
 * CPED_CONFIG_FLAG_IsDecoyPed = 451,
 * CPED_CONFIG_FLAG_HasEstablishedDecoy = 452,
 * CPED_CONFIG_FLAG_BlockDispatchedHelicoptersFromLanding = 453,
 * CPED_CONFIG_FLAG_DontCryForHelpOnStun = 454,
 * CPED_CONFIG_FLAG_HitByTranqWeapon = 455,
 * CPED_CONFIG_FLAG_CanBeIncapacitated = 456,
 * CPED_CONFIG_FLAG_ForcedAimFromArrest = 457,
 * CPED_CONFIG_FLAG_DontChangeTargetFromMelee = 458,
 * _0x4376ABF2 = 459,
 * CPED_CONFIG_FLAG_RagdollFloatsIndefinitely = 460,
 * CPED_CONFIG_FLAG_BlockElectricWeaponDamage = 461,
 * _0x262A3B8E = 462,
 * _0x1AA79A25 = 463,
 * }
 */
global.SetPedConfigFlag = function (ped, flagId, value) {
	return _in(0x00000000, 0x9cfbe10d, ped, flagId, value);
};

/**
 * Sets Ped Default Clothes
 */
global.SetPedDefaultComponentVariation = function (ped) {
	return _in(0x00000000, 0xc866a984, ped);
};

/**
 * Used for freemode (online) characters.
 * Indices:
 * 1.  black
 * 2.  very light blue/green
 * 3.  dark blue
 * 4.  brown
 * 5.  darker brown
 * 6.  light brown
 * 7.  blue
 * 8.  light blue
 * 9.  pink
 * 10. yellow
 * 11. purple
 * 12. black
 * 13. dark green
 * 14. light brown
 * 15. yellow/black pattern
 * 16. light colored spiral pattern
 * 17. shiny red
 * 18. shiny half blue/half red
 * 19. half black/half light blue
 * 20. white/red perimter
 * 21. green snake
 * 22. red snake
 * 23. dark blue snake
 * 24. dark yellow
 * 25. bright yellow
 * 26. all black
 * 27. red small pupil
 * 28. devil blue/black
 * 29. white small pupil
 * 30. glossed over
 */
global.SetPedEyeColor = function (ped, index) {
	return _in(0x00000000, 0xec09db1b, ped, index);
};

/**
 * Sets the various freemode face features, e.g. nose length, chin shape.
 * **Indexes (From 0 to 19):**
 * Parentheses indicate morph scale/direction as in (-1.0 to 1.0)
 * *   **0**: Nose Width (Thin/Wide)
 * *   **1**: Nose Peak (Up/Down)
 * *   **2**: Nose Length (Long/Short)
 * *   **3**: Nose Bone Curveness (Crooked/Curved)
 * *   **4**: Nose Tip (Up/Down)
 * *   **5**: Nose Bone Twist (Left/Right)
 * *   **6**: Eyebrow (Up/Down)
 * *   **7**: Eyebrow (In/Out)
 * *   **8**: Cheek Bones (Up/Down)
 * *   **9**: Cheek Sideways Bone Size (In/Out)
 * *   **10**: Cheek Bones Width (Puffed/Gaunt)
 * *   **11**: Eye Opening (Both) (Wide/Squinted)
 * *   **12**: Lip Thickness (Both) (Fat/Thin)
 * *   **13**: Jaw Bone Width (Narrow/Wide)
 * *   **14**: Jaw Bone Shape (Round/Square)
 * *   **15**: Chin Bone (Up/Down)
 * *   **16**: Chin Bone Length (In/Out or Backward/Forward)
 * *   **17**: Chin Bone Shape (Pointed/Square)
 * *   **18**: Chin Hole (Chin Bum)
 * *   **19**: Neck Thickness (Thin/Thick)
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#\_0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * @param ped The ped entity
 * @param index An integer ranging from 0 to 19
 * @param scale A float ranging from -1.0 to 1.0
 */
global.SetPedFaceFeature = function (ped, index, scale) {
	return _in(0x00000000, 0x6c8d4458, ped, index, _fv(scale));
};

/**
 * Sets the tint index for the hair on the specified ped.
 * ```
 * NativeDB Introduced: v323
 * ```
 * @param ped The Ped whose hair tint is to be set.
 * @param colorID The tint index for the primary hair color.
 * @param highlightColorID The tint index for the hair highlight color.
 */
global.SetPedHairTint = function (ped, colorID, highlightColorID) {
	return _in(0x00000000, 0xa23fe32c, ped, colorID, highlightColorID);
};
global.SetPedHairColor = global.SetPedHairTint;

/**
 * For more info and the list of faceIDs please refer to [this](https://gtaforums.com/topic/858970-all-gtao-face-ids-pedset-ped-head-blend-data-explained) topic. Note that the Skin and Shape IDs are shared. This native will use this same list for both Skin and Shape IDs.
 * **Other information:**
 * IDs start at zero and go Male Non-DLC, Female Non-DLC, Male DLC, and Female DLC.
 * This native function is often called prior to calling natives such as:
 * *   [`SetPedHairColor`](#\_0xA23FE32C)
 * *   [`SetPedHeadOverlayColor`](#\_0x78935A27)
 * *   [`SetPedHeadOverlay`](#\_0xD28DBA90)
 * *   [`SetPedFaceFeature`](#\_0x6C8D4458)
 * @param ped The ped entity
 * @param shapeFirstID Controls the shape of the first ped's face
 * @param shapeSecondID Controls the shape of the second ped's face
 * @param shapeThirdID Controls the shape of the third ped's face
 * @param skinFirstID Controls the first id's skin tone
 * @param skinSecondID Controls the second id's skin tone
 * @param skinThirdID Controls the third id's skin tone
 * @param shapeMix 0.0 - 1.0 Of whose characteristics to take Mother -> Father (shapeFirstID and shapeSecondID)
 * @param skinMix 0.0 - 1.0 Of whose characteristics to take Mother -> Father (skinFirstID and skinSecondID)
 * @param thirdMix Overrides the others in favor of the third IDs.
 * @param isParent IsParent is set for "children" of the player character's grandparents during old-gen character creation. It has unknown effect otherwise.
 */
global.SetPedHeadBlendData = function (ped, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent) {
	return _in(0x00000000, 0x60746b88, ped, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, _fv(shapeMix), _fv(skinMix), _fv(thirdMix), isParent);
};

/**
 * ```
 * OverlayID ranges from 0 to 12, index from 0 to _GET_NUM_OVERLAY_VALUES(overlayID)-1, and opacity from 0.0 to 1.0.
 * overlayID       Part                  Index, to disable
 * 0               Blemishes             0 - 23, 255
 * 1               Facial Hair           0 - 28, 255
 * 2               Eyebrows              0 - 33, 255
 * 3               Ageing                0 - 14, 255
 * 4               Makeup                0 - 74, 255
 * 5               Blush                 0 - 6, 255
 * 6               Complexion            0 - 11, 255
 * 7               Sun Damage            0 - 10, 255
 * 8               Lipstick              0 - 9, 255
 * 9               Moles/Freckles        0 - 17, 255
 * 10              Chest Hair            0 - 16, 255
 * 11              Body Blemishes        0 - 11, 255
 * 12              Add Body Blemishes    0 - 1, 255
 * ```
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#\_0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * @param ped The ped entity
 * @param overlayID The overlay id displayed up above.
 * @param index An integer representing the index (from 0 to `_GET_NUM_OVERLAY_VALUES(overlayID)-1`)
 * @param opacity A float ranging from 0.0 to 1.0
 */
global.SetPedHeadOverlay = function (ped, overlayID, index, opacity) {
	return _in(0x00000000, 0xd28dba90, ped, overlayID, index, _fv(opacity));
};

/**
 * ```
 * Used for freemode (online) characters.
 * Called after SET_PED_HEAD_OVERLAY().
 * ```
 * **Note:**
 * You may need to call [`SetPedHeadBlendData`](#\_0x9414E18B9434C2FE) prior to calling this native in order for it to work.
 * @param ped The ped entity
 * @param overlayID An integer representing the overlay id
 * @param colorType 1 for eyebrows, beards, makeup, and chest hair; 2 for blush and lipstick; and 0 otherwise, though not called in those cases.
 * @param colorID An integer representing the primary color id
 * @param secondColorID An integer representing the secondary color id
 */
global.SetPedHeadOverlayColor = function (ped, overlayID, colorType, colorID, secondColorID) {
	return _in(0x00000000, 0x78935a27, ped, overlayID, colorType, colorID, secondColorID);
};

/**
 * SET_PED_INTO_VEHICLE
 * @param seatIndex See eSeatPosition declared in [`IS_VEHICLE_SEAT_FREE`](#\_0x22AC59A870E6A669). -2 for the first available seat.
 */
global.SetPedIntoVehicle = function (ped, vehicle, seatIndex) {
	return _in(0x00000000, 0x07500c79, ped, vehicle, seatIndex);
};

/**
 * This native is used to set prop variation on a ped. Components, drawables and textures IDs are related to the ped model.
 * ### MP Freemode list of props
 * **0**: Hats
 * **1**: Glasses
 * **2**: Ears
 * **6**: Watches
 * **7**: Bracelets
 * List of Prop IDs
 * ```cpp
 * enum eAnchorPoints
 * {
 * ANCHOR_HEAD = 0, // "p_head"
 * ANCHOR_EYES = 1, // "p_eyes"
 * ANCHOR_EARS = 2, // "p_ears"
 * ANCHOR_MOUTH = 3, // "p_mouth"
 * ANCHOR_LEFT_HAND = 4, // "p_lhand"
 * ANCHOR_RIGHT_HAND = 5, // "p_rhand"
 * ANCHOR_LEFT_WRIST = 6, // "p_lwrist"
 * ANCHOR_RIGHT_WRIST = 7, // "p_rwrist"
 * ANCHOR_HIP = 8, // "p_lhip"
 * ANCHOR_LEFT_FOOT = 9, // "p_lfoot"
 * ANCHOR_RIGHT_FOOT = 10, // "p_rfoot"
 * ANCHOR_PH_L_HAND = 11, // "ph_lhand"
 * ANCHOR_PH_R_HAND = 12, // "ph_rhand"
 * NUM_ANCHORS = 13,
 * };
 * ```
 * @param ped The ped handle.
 * @param componentId The component that you want to set. Refer to [SET_PED_COMPONENT_VARIATION](#\_0x262B14F48D29DE80).
 * @param drawableId The drawable id that is going to be set. Refer to [GET_NUMBER_OF_PED_PROP_DRAWABLE_VARIATIONS](#\_0x5FAF9754E789FB47).
 * @param textureId The texture id of the drawable. Refer to [GET_NUMBER_OF_PED_PROP_TEXTURE_VARIATIONS](#\_0xA6E7F1CEB523E171).
 * @param attach Attached or not.
 */
global.SetPedPropIndex = function (ped, componentId, drawableId, textureId, attach) {
	return _in(0x00000000, 0x0829f2e2, ped, componentId, drawableId, textureId, attach);
};

/**
 * p1 is always 0 in R* scripts; and a quick disassembly seems to indicate that p1 is unused.
 */
global.SetPedRandomComponentVariation = function (ped, p1) {
	return _in(0x00000000, 0x4111ba46, ped, p1);
};

/**
 * SET_PED_RANDOM_PROPS
 * @param ped The ped handle.
 */
global.SetPedRandomProps = function (ped) {
	return _in(0x00000000, 0xe3318e0e, ped);
};

/**
 * PED::SET_PED_RESET_FLAG(PLAYER::PLAYER_PED_ID(), 240, 1);
 * Known values:
 */
global.SetPedResetFlag = function (ped, flagId, doReset) {
	return _in(0x00000000, 0xcff6ff66, ped, flagId, doReset);
};

/**
 * p4/p5: Unusued in TU27
 * ### Ragdoll Types
 * **0**: CTaskNMRelax
 * **1**: CTaskNMScriptControl: Hardcoded not to work in networked environments.
 * **Else**: CTaskNMBalance
 * @param ped The ped to ragdoll.
 * @param minTime Time(ms) Ped is in ragdoll mode; only applies to ragdoll types 0 and not 1.
 * @param bAbortIfInjured unused
 * @param bAbortIfDead unused
 */
global.SetPedToRagdoll = function (ped, minTime, maxTime, ragdollType, bAbortIfInjured, bAbortIfDead, bForceScriptControl) {
	return _in(0x00000000, 0x83cb5052, ped, minTime, maxTime, ragdollType, bAbortIfInjured, bAbortIfDead, bForceScriptControl);
};

/**
 * cpp
 * enum eNMFallType {
 * TYPE_FROM_HIGH = 0,
 * TYPE_OVER_WALL = 1,
 * TYPE_DOWN_STAIRS = 2,
 * TYPE_DIE_TYPES = 3,
 * TYPE_DIE_FROM_HIGH = 4,
 * TYPE_DIE_OVER_WALL = 5,
 * TYPE_DIE_DOWN_STAIRS = 6
 * }
 * ```
 * ```
 * Return variable is never used in R*'s scripts.
 * Not sure what p2 does. It seems like it would be a time judging by it's usage in R*'s scripts, but didn't seem to affect anything in my testings.
 * x, y, and z are coordinates, most likely to where the ped will fall.
 * p7 is probably the force of the fall, but untested, so I left the variable name the same.
 * p8 to p13 are always 0f in R*'s scripts.
 * (Simplified) Example of the usage of the function from R*'s scripts:
 * ped::set_ped_to_ragdoll_with_fall(ped, 1500, 2000, 1, -entity::get_entity_forward_vector(ped), 1f, 0f, 0f, 0f, 0f, 0f, 0f);
 * @param ped The ped to ragdoll.
 * @param nFallType The type of fall.
 * @param dirX The x direction of the fall.
 * @param dirY The y direction of the fall.
 * @param dirZ The z direction of the fall.
 * @param fGroundHeight The ground height (z).
 * @param grab1X unused
 * @param grab1Y unused
 * @param grab1Z unused
 * @param grab2X unused
 * @param grab2Y unused
 * @param grab2Z unused
 */
global.SetPedToRagdollWithFall = function (ped, minTime, maxTime, nFallType, dirX, dirY, dirZ, fGroundHeight, grab1X, grab1Y, grab1Z, grab2X, grab2Y, grab2Z) {
	return _in(0x00000000, 0xfa12e286, ped, minTime, maxTime, nFallType, _fv(dirX), _fv(dirY), _fv(dirZ), _fv(fGroundHeight), _fv(grab1X), _fv(grab1Y), _fv(grab1Z), _fv(grab2X), _fv(grab2Y), _fv(grab2Z));
};

/**
 * Flags:
 * SPC_AMBIENT_SCRIPT = (1 << 1),
 * SPC_CLEAR_TASKS = (1 << 2),
 * SPC_REMOVE_FIRES = (1 << 3),
 * SPC_REMOVE_EXPLOSIONS = (1 << 4),
 * SPC_REMOVE_PROJECTILES = (1 << 5),
 * SPC_DEACTIVATE_GADGETS = (1 << 6),
 * SPC_REENABLE_CONTROL_ON_DEATH = (1 << 7),
 * SPC_LEAVE_CAMERA_CONTROL_ON = (1 << 8),
 * SPC_ALLOW_PLAYER_DAMAGE = (1 << 9),
 * SPC_DONT_STOP_OTHER_CARS_AROUND_PLAYER = (1 << 10),
 * SPC_PREVENT_EVERYBODY_BACKOFF = (1 << 11),
 * SPC_ALLOW_PAD_SHAKE = (1 << 12)
 * See: https://alloc8or.re/gta5/doc/enums/eSetPlayerControlFlag.txt
 */
global.SetPlayerControl = function (player, bHasControl, flags) {
	return _in(0x00000000, 0xd17afcd8, _ts(player), bHasControl, flags);
};

/**
 * Sets the culling radius for the specified player.
 * Set to `0.0` to reset.
 * **WARNING**: Culling natives are deprecated and have known, [unfixable issues](https://forum.cfx.re/t/issue-with-culling-radius-and-server-side-entities/4900677/4)
 * @param playerSrc The player to set the culling radius for.
 * @param radius The radius.
 */
global.SetPlayerCullingRadius = function (playerSrc, radius) {
	return _in(0x00000000, 0x8a2fbad4, _ts(playerSrc), _fv(radius));
};

/**
 * Make the player impervious to all forms of damage.
 * @param player The player index.
 */
global.SetPlayerInvincible = function (player, bInvincible) {
	return _in(0x00000000, 0xdfb9a2a2, _ts(player), bInvincible);
};

/**
 * Set the model for a specific Player. Note that this will destroy the current Ped for the Player and create a new one, any reference to the old ped will be invalid after calling this.
 * As per usual, make sure to request the model first and wait until it has loaded.
 * @param player The player to set the model for
 * @param model The model to use
 */
global.SetPlayerModel = function (player, model) {
	return _in(0x00000000, 0x774a4c54, _ts(player), _ch(model));
};

/**
 * Sets the routing bucket for the specified player.
 * Routing buckets are also known as 'dimensions' or 'virtual worlds' in past echoes, however they are population-aware.
 * @param playerSrc The player to set the routing bucket for.
 * @param bucket The bucket ID.
 */
global.SetPlayerRoutingBucket = function (playerSrc, bucket) {
	return _in(0x00000000, 0x6504eb38, _ts(playerSrc), bucket);
};

/**
 * SET_PLAYER_WANTED_LEVEL
 * @param player the target player
 * @param wantedLevel the wanted level 1-5
 * @param delayedResponse false = 0-10sec police spawn response time, true = 10-20sec police spawn response time
 */
global.SetPlayerWantedLevel = function (player, wantedLevel, delayedResponse) {
	return _in(0x00000000, 0xb7a0914b, _ts(player), wantedLevel, delayedResponse);
};

/**
 * A setter for [GET_RESOURCE_KVP_STRING](#\_0x5240DA5A).
 * @param key The key to set
 * @param value The value to write
 */
global.SetResourceKvp = function (key, value) {
	return _in(0x00000000, 0x21c7a35b, _ts(key), _ts(value));
};

/**
 * A setter for [GET_RESOURCE_KVP_FLOAT](#\_0x35BDCEEA).
 * @param key The key to set
 * @param value The value to write
 */
global.SetResourceKvpFloat = function (key, value) {
	return _in(0x00000000, 0x9add2938, _ts(key), _fv(value));
};

/**
 * Nonsynchronous [SET_RESOURCE_KVP_FLOAT](#\_0x9ADD2938) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key The key to set
 * @param value The value to write
 */
global.SetResourceKvpFloatNoSync = function (key, value) {
	return _in(0x00000000, 0x3517bfbe, _ts(key), _fv(value));
};

/**
 * A setter for [GET_RESOURCE_KVP_INT](#\_0x557B586A).
 * @param key The key to set
 * @param value The value to write
 */
global.SetResourceKvpInt = function (key, value) {
	return _in(0x00000000, 0x06a2b1e8, _ts(key), value);
};

/**
 * Nonsynchronous [SET_RESOURCE_KVP_INT](#\_0x6A2B1E8) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key The key to set
 * @param value The value to write
 */
global.SetResourceKvpIntNoSync = function (key, value) {
	return _in(0x00000000, 0x26aeb707, _ts(key), value);
};

/**
 * Nonsynchronous [SET_RESOURCE_KVP](#\_0x21C7A35B) operation; see [FLUSH_RESOURCE_KVP](#\_0x5240DA5A).
 * @param key The key to set
 * @param value The value to write
 */
global.SetResourceKvpNoSync = function (key, value) {
	return _in(0x00000000, 0x0cf9a2ff, _ts(key), _ts(value));
};

/**
 * Sets the entity lockdown mode for a specific routing bucket.
 * Lockdown modes are:
 * | Mode       | Meaning                                                    |
 * | ---------- | ---------------------------------------------------------- |
 * | `strict`   | No entities can be created by clients at all.              |
 * | `relaxed`  | Only script-owned entities created by clients are blocked. |
 * | `inactive` | Clients can create any entity they want.                   |
 * @param bucketId The routing bucket ID to adjust.
 * @param mode One of aforementioned modes.
 */
global.SetRoutingBucketEntityLockdownMode = function (bucketId, mode) {
	return _in(0x00000000, 0xa0f2201f, bucketId, _ts(mode));
};

/**
 * Sets whether or not the specified routing bucket has automatically-created population enabled.
 * @param bucketId The routing bucket ID to adjust.
 * @param mode `true` to enable population, `false` to disable population.
 */
global.SetRoutingBucketPopulationEnabled = function (bucketId, mode) {
	return _in(0x00000000, 0xce51ac2c, bucketId, mode);
};

/**
 * Internal function for setting a state bag value.
 */
global.SetStateBagValue = function (bagName, keyName, valueData, valueLength, replicated) {
	return _in(0x00000000, 0x8d50e33a, _ts(bagName), _ts(keyName), _ts(valueData), valueLength, replicated);
};

/**
 * SET_VEHICLE_ALARM
 */
global.SetVehicleAlarm = function (vehicle, state) {
	return _in(0x00000000, 0x24877d84, vehicle, state);
};

/**
 * p2 often set to 1000.0 in the decompiled scripts.
 */
global.SetVehicleBodyHealth = function (vehicle, value) {
	return _in(0x00000000, 0x920c2517, vehicle, _fv(value));
};

/**
 * Sets the selected vehicle's colors to their default value (specific variant specified using the colorCombination parameter).
 * Range of possible values for colorCombination is currently unknown, I couldn't find where these values are stored either (Disquse's guess was vehicles.meta but I haven't seen it in there.)
 * @param vehicle The vehicle to modify.
 * @param colorCombination One of the default color values of the vehicle.
 */
global.SetVehicleColourCombination = function (vehicle, colorCombination) {
	return _in(0x00000000, 0xa557aead, vehicle, colorCombination);
};

/**
 * colorPrimary & colorSecondary are the paint indexes for the vehicle.
 * For a list of valid paint indexes, view: pastebin.com/pwHci0xK
 */
global.SetVehicleColours = function (vehicle, colorPrimary, colorSecondary) {
	return _in(0x00000000, 0x57f24253, vehicle, colorPrimary, colorSecondary);
};

/**
 * p1, p2, p3 are RGB values for color (255,0,0 for Red, ect)
 */
global.SetVehicleCustomPrimaryColour = function (vehicle, r, g, b) {
	return _in(0x00000000, 0x8df9f9bc, vehicle, r, g, b);
};

/**
 * p1, p2, p3 are RGB values for color (255,0,0 for Red, ect)
 */
global.SetVehicleCustomSecondaryColour = function (vehicle, r, g, b) {
	return _in(0x00000000, 0x9d77259e, vehicle, r, g, b);
};

/**
 * Sets the dirt level of the passed vehicle.
 * @param vehicle The vehicle to set.
 * @param dirtLevel A number between 0.0 and 15.0 representing the vehicles dirt level.
 */
global.SetVehicleDirtLevel = function (vehicle, dirtLevel) {
	return _in(0x00000000, 0x2b39128b, vehicle, _fv(dirtLevel));
};

/**
 * See eDoorId declared in [`SET_VEHICLE_DOOR_SHUT`](#\_0x93D9BD300D7789E5)
 */
global.SetVehicleDoorBroken = function (vehicle, doorIndex, deleteDoor) {
	return _in(0x00000000, 0x8147fea7, vehicle, doorIndex, deleteDoor);
};

/**
 * Locks the doors of a specified vehicle to a defined lock state, affecting how players and NPCs can interact with the vehicle.
 * ```
 * NativeDB Introduced: v323
 * ```
 * ```cpp
 * enum eVehicleLockState {
 * // No specific lock state, vehicle behaves according to the game's default settings.
 * VEHICLELOCK_NONE = 0,
 * // Vehicle is fully unlocked, allowing free entry by players and NPCs.
 * VEHICLELOCK_UNLOCKED = 1,
 * // Vehicle is locked, preventing entry by players and NPCs.
 * VEHICLELOCK_LOCKED = 2,
 * // Vehicle locks out only players, allowing NPCs to enter.
 * VEHICLELOCK_LOCKOUT_PLAYER_ONLY = 3,
 * // Vehicle is locked once a player enters, preventing others from entering.
 * VEHICLELOCK_LOCKED_PLAYER_INSIDE = 4,
 * // Vehicle starts in a locked state, but may be unlocked through game events.
 * VEHICLELOCK_LOCKED_INITIALLY = 5,
 * // Forces the vehicle's doors to shut and lock.
 * VEHICLELOCK_FORCE_SHUT_DOORS = 6,
 * // Vehicle is locked but can still be damaged.
 * VEHICLELOCK_LOCKED_BUT_CAN_BE_DAMAGED = 7,
 * // Vehicle is locked, but its trunk/boot remains unlocked.
 * VEHICLELOCK_LOCKED_BUT_BOOT_UNLOCKED = 8,
 * // Vehicle is locked and does not allow passengers, except for the driver.
 * VEHICLELOCK_LOCKED_NO_PASSENGERS = 9,
 * // Vehicle is completely locked, preventing entry entirely, even if previously inside.
 * VEHICLELOCK_CANNOT_ENTER = 10
 * };
 * ```
 * @param vehicle The vehicle whose doors are to be locked.
 * @param doorLockStatus The lock state to apply to the vehicle's doors, see `eVehicleLockState`.
 */
global.SetVehicleDoorsLocked = function (vehicle, doorLockStatus) {
	return _in(0x00000000, 0x4cdd35d0, vehicle, doorLockStatus);
};

/**
 * SET_VEHICLE_NUMBER_PLATE_TEXT
 * @param vehicle The vehicle to set the plate for
 * @param plateText The text to set the plate to, 8 chars maximum
 */
global.SetVehicleNumberPlateText = function (vehicle, plateText) {
	return _in(0x00000000, 0x400f9556, vehicle, _ts(plateText));
};

/**
 * START_FIND_KVP
 * @param prefix A prefix match
 * @return A KVP find handle to use with [FIND_KVP](#\_0xBD7BEBC5) and close with [END_FIND_KVP](#\_0xB3210203)
 */
global.StartFindKvp = function (prefix) {
	return _in(0x00000000, 0xdd379006, _ts(prefix), _r, _ri);
};

/**
 * START_RESOURCE
 */
global.StartResource = function (resourceName) {
	return _in(0x00000000, 0x29b440dc, _ts(resourceName), _r);
};

/**
 * STATE_BAG_HAS_KEY
 * @param bagName The name of the bag.
 * @param key The key used to check data existence.
 * @return Returns true if the data associated with the specified key exists; otherwise, returns false.
 */
global.StateBagHasKey = function (bagName, key) {
	return _in(0x00000000, 0x0012a330, _ts(bagName), _ts(key), _r);
};

/**
 * STOP_RESOURCE
 */
global.StopResource = function (resourceName) {
	return _in(0x00000000, 0x21783161, _ts(resourceName), _r);
};

/**
 * Makes the specified ped attack the target ped.
 * p2 should be 0
 * p3 should be 16
 */
global.TaskCombatPed = function (ped, targetPed, p2, p3) {
	return _in(0x00000000, 0xcb0d8932, ped, targetPed, p2, p3);
};

/**
 * Example:
 * TASK::TASK_DRIVE_BY(l_467[1 -- [[22]] ], PLAYER::PLAYER_PED_ID(), 0, 0.0, 0.0, 2.0, 300.0, 100, 0, ${firing_pattern_burst_fire_driveby});
 * Needs working example. Doesn't seem to do anything.
 * I marked p2 as targetVehicle as all these shooting related tasks seem to have that in common.
 * I marked p6 as distanceToShoot as if you think of GTA's Logic with the native SET_VEHICLE_SHOOT natives, it won't shoot till it gets within a certain distance of the target.
 * I marked p7 as pedAccuracy as it seems it's mostly 100 (Completely Accurate), 75, 90, etc. Although this could be the ammo count within the gun, but I highly doubt it. I will change this comment once I find out if it's ammo count or not.
 */
global.TaskDriveBy = function (driverPed, targetPed, targetVehicle, targetX, targetY, targetZ, distanceToShoot, pedAccuracy, p8, firingPattern) {
	return _in(0x00000000, 0x2b84d1c4, driverPed, targetPed, targetVehicle, _fv(targetX), _fv(targetY), _fv(targetZ), _fv(distanceToShoot), pedAccuracy, p8, _ch(firingPattern));
};

/**
 * speed 1.0 = walk, 2.0 = run
 * p5 1 = normal, 3 = teleport to vehicle, 8 = normal/carjack ped from seat, 16 = teleport directly into vehicle
 * p6 is always 0
 * @param seatIndex See eSeatPosition declared in [`IS_VEHICLE_SEAT_FREE`](#\_0x22AC59A870E6A669).
 */
global.TaskEnterVehicle = function (ped, vehicle, timeout, seatIndex, speed, flag, p6) {
	return _in(0x00000000, 0xb8689b4e, ped, vehicle, timeout, seatIndex, _fv(speed), flag, p6);
};

/**
 * TASK_EVERYONE_LEAVE_VEHICLE
 */
global.TaskEveryoneLeaveVehicle = function (vehicle) {
	return _in(0x00000000, 0xc1971f30, vehicle);
};

/**
 * TASK_GO_STRAIGHT_TO_COORD
 * @param ped The ped handle.
 * @param x The x coordinate.
 * @param y The y coordinate.
 * @param z The z coordinate.
 * @param speed The ped movement speed.
 * @param timeout \-1 , other values appear to break the ped movement.
 * @param targetHeading The heading you want the ped to be on x,y,z coord.
 * @param distanceToSlide The distance from x,y,z where the ped will start sliding.
 */
global.TaskGoStraightToCoord = function (ped, x, y, z, speed, timeout, targetHeading, distanceToSlide) {
	return _in(0x00000000, 0x80a9e7a7, ped, _fv(x), _fv(y), _fv(z), _fv(speed), timeout, _fv(targetHeading), _fv(distanceToSlide));
};

/**
 * Tells a ped to go to a coord by any means.
 * ```cpp
 * enum eDrivingMode {
 * DF_StopForCars = 1,
 * DF_StopForPeds = 2,
 * DF_SwerveAroundAllCars = 4,
 * DF_SteerAroundStationaryCars = 8,
 * DF_SteerAroundPeds = 16,
 * DF_SteerAroundObjects = 32,
 * DF_DontSteerAroundPlayerPed = 64,
 * DF_StopAtLights = 128,
 * DF_GoOffRoadWhenAvoiding = 256,
 * DF_DriveIntoOncomingTraffic = 512,
 * DF_DriveInReverse = 1024,
 * // If pathfinding fails, cruise randomly instead of going on a straight line
 * DF_UseWanderFallbackInsteadOfStraightLine = 2048,
 * DF_AvoidRestrictedAreas = 4096,
 * // These only work on MISSION_CRUISE
 * DF_PreventBackgroundPathfinding = 8192,
 * DF_AdjustCruiseSpeedBasedOnRoadSpeed = 16384,
 * DF_UseShortCutLinks =  262144,
 * DF_ChangeLanesAroundObstructions = 524288,
 * // cruise tasks ignore this anyway--only used for goto's
 * DF_UseSwitchedOffNodes =  2097152,
 * // if you're going to be primarily driving off road
 * DF_PreferNavmeshRoute =  4194304,
 * // Only works for planes using MISSION_GOTO, will cause them to drive along the ground instead of fly
 * DF_PlaneTaxiMode =  8388608,
 * DF_ForceStraightLine = 16777216,
 * DF_UseStringPullingAtJunctions = 33554432,
 * DF_AvoidHighways = 536870912,
 * DF_ForceJoinInRoadDirection = 1073741824,
 * // Standard driving mode. stops for cars, peds, and lights, goes around stationary obstructions
 * DRIVINGMODE_STOPFORCARS = 786603, // DF_StopForCars|DF_StopForPeds|DF_SteerAroundObjects|DF_SteerAroundStationaryCars|DF_StopAtLights|DF_UseShortCutLinks|DF_ChangeLanesAroundObstructions,		// Obey lights too
 * // Like the above, but doesn't steer around anything in its way - will only wait instead.
 * DRIVINGMODE_STOPFORCARS_STRICT = 262275, // DF_StopForCars|DF_StopForPeds|DF_StopAtLights|DF_UseShortCutLinks, // Doesn't deviate an inch.
 * // Default "alerted" driving mode. drives around everything, doesn't obey lights
 * DRIVINGMODE_AVOIDCARS = 786469, // DF_SwerveAroundAllCars|DF_SteerAroundObjects|DF_UseShortCutLinks|DF_ChangeLanesAroundObstructions|DF_StopForCars,
 * // Very erratic driving. difference between this and AvoidCars is that it doesn't use the brakes at ALL to help with steering
 * DRIVINGMODE_AVOIDCARS_RECKLESS = 786468, // DF_SwerveAroundAllCars|DF_SteerAroundObjects|DF_UseShortCutLinks|DF_ChangeLanesAroundObstructions,
 * // Smashes through everything
 * DRIVINGMODE_PLOUGHTHROUGH = 262144, // DF_UseShortCutLinks
 * // Drives normally except for the fact that it ignores lights
 * DRIVINGMODE_STOPFORCARS_IGNORELIGHTS = 786475, // DF_StopForCars|DF_SteerAroundStationaryCars|DF_StopForPeds|DF_SteerAroundObjects|DF_UseShortCutLinks|DF_ChangeLanesAroundObstructions
 * // Try to swerve around everything, but stop for lights if necessary
 * DRIVINGMODE_AVOIDCARS_OBEYLIGHTS = 786597, // DF_SwerveAroundAllCars|DF_StopAtLights|DF_SteerAroundObjects|DF_UseShortCutLinks|DF_ChangeLanesAroundObstructions|DF_StopForCars
 * // Swerve around cars, be careful around peds, and stop for lights
 * DRIVINGMODE_AVOIDCARS_STOPFORPEDS_OBEYLIGHTS = 786599 // DF_SwerveAroundAllCars|DF_StopAtLights|DF_StopForPeds|DF_SteerAroundObjects|DF_UseShortCutLinks|DF_ChangeLanesAroundObstructions|DF_StopForCars
 * };
 * ```
 * @param ped The `Ped` Handle.
 * @param x The goto target coordinate.
 * @param y The goto target coordinate.
 * @param z The goto target coordinate.
 * @param fMoveBlendRatio 0.0 = still, 1.0 = walk, 2.0 = run, 3.0 = sprint.
 * @param vehicle If defined, the pedestrian will only move if said vehicle exists. If you don't want any sort of association, just set it to `0`.
 * @param bUseLongRangeVehiclePathing Setting to `true` tells the vehicle to use longrange vehicle pathing.
 * @param drivingFlags See `eDrivingMode` enum.
 * @param fMaxRangeToShootTargets Determines the maximum distance at which the `Ped` will engage in combat with threatening targets.
 */
global.TaskGoToCoordAnyMeans = function (ped, x, y, z, fMoveBlendRatio, vehicle, bUseLongRangeVehiclePathing, drivingFlags, fMaxRangeToShootTargets) {
	return _in(0x00000000, 0xf91df93b, ped, _fv(x), _fv(y), _fv(z), _fv(fMoveBlendRatio), vehicle, bUseLongRangeVehiclePathing, drivingFlags, _fv(fMaxRangeToShootTargets));
};

/**
 * The entity will move towards the target until time is over (duration) or get in target's range (distance). p5 and p6 are unknown, but you could leave p5 = 1073741824 or 100 or even 0 (didn't see any difference but on the decompiled scripts, they use 1073741824 mostly) and p6 = 0
 * Note: I've only tested it on entity -> ped and target -> vehicle. It could work differently on other entities, didn't try it yet.
 * Example: TASK::TASK_GO_TO_ENTITY(pedHandle, vehicleHandle, 5000, 4.0, 100, 1073741824, 0)
 * Ped will run towards the vehicle for 5 seconds and stop when time is over or when he gets 4 meters(?) around the vehicle (with duration = -1, the task duration will be ignored).
 */
global.TaskGoToEntity = function (entity, target, duration, distance, speed, p5, p6) {
	return _in(0x00000000, 0x374827c2, entity, target, duration, _fv(distance), _fv(speed), _fv(p5), p6);
};

/**
 * In the scripts, p3 was always -1.
 * p3 seems to be duration or timeout of turn animation.
 * Also facingPed can be 0 or -1 so ped will just raise hands up.
 */
global.TaskHandsUp = function (ped, duration, facingPed, p3, p4) {
	return _in(0x00000000, 0x8dcc19c5, ped, duration, facingPed, p3, p4);
};

/**
 * Flags are the same flags used in [`TASK_LEAVE_VEHICLE`](#\_0xD3DBCE61A490BE02)
 */
global.TaskLeaveAnyVehicle = function (ped, p1, flags) {
	return _in(0x00000000, 0xdbdd79fa, ped, p1, flags);
};

/**
 * Flags from decompiled scripts:
 * 0 = normal exit and closes door.
 * 1 = normal exit and closes door.
 * 16 = teleports outside, door kept closed.  (This flag does not seem to work for the front seats in buses, NPCs continue to exit normally)
 * 64 = normal exit and closes door, maybe a bit slower animation than 0.
 * 256 = normal exit but does not close the door.
 * 4160 = ped is throwing himself out, even when the vehicle is still.
 * 262144 = ped moves to passenger seat first, then exits normally
 * Others to be tried out: 320, 512, 131072.
 */
global.TaskLeaveVehicle = function (ped, vehicle, flags) {
	return _in(0x00000000, 0x7b1141c6, ped, vehicle, flags);
};

/**
 * [Animations list](https://alexguirre.github.io/animations-list/)
 * ```cpp
 * enum eScriptedAnimFlags
 * {
 * AF_LOOPING = 1,
 * AF_HOLD_LAST_FRAME = 2,
 * AF_REPOSITION_WHEN_FINISHED = 4,
 * AF_NOT_INTERRUPTABLE = 8,
 * AF_UPPERBODY = 16,
 * AF_SECONDARY = 32,
 * AF_REORIENT_WHEN_FINISHED = 64,
 * AF_ABORT_ON_PED_MOVEMENT = 128,
 * AF_ADDITIVE = 256,
 * AF_TURN_OFF_COLLISION = 512,
 * AF_OVERRIDE_PHYSICS = 1024,
 * AF_IGNORE_GRAVITY = 2048,
 * AF_EXTRACT_INITIAL_OFFSET = 4096,
 * AF_EXIT_AFTER_INTERRUPTED = 8192,
 * AF_TAG_SYNC_IN = 16384,
 * AF_TAG_SYNC_OUT = 32768,
 * AF_TAG_SYNC_CONTINUOUS = 65536,
 * AF_FORCE_START = 131072,
 * AF_USE_KINEMATIC_PHYSICS = 262144,
 * AF_USE_MOVER_EXTRACTION = 524288,
 * AF_HIDE_WEAPON = 1048576,
 * AF_ENDS_IN_DEAD_POSE = 2097152,
 * AF_ACTIVATE_RAGDOLL_ON_COLLISION = 4194304,
 * AF_DONT_EXIT_ON_DEATH = 8388608,
 * AF_ABORT_ON_WEAPON_DAMAGE = 16777216,
 * AF_DISABLE_FORCED_PHYSICS_UPDATE = 33554432,
 * AF_PROCESS_ATTACHMENTS_ON_START = 67108864,
 * AF_EXPAND_PED_CAPSULE_FROM_SKELETON = 134217728,
 * AF_USE_ALTERNATIVE_FP_ANIM = 268435456,
 * AF_BLENDOUT_WRT_LAST_FRAME = 536870912,
 * AF_USE_FULL_BLENDING = 1073741824
 * }
 * ```
 * @param ped The ped you want to play the animation
 * @param animDictionary The animation dictionary
 * @param animationName The animation name
 * @param blendInSpeed The speed at which the animation blends in. Lower is slower and higher is faster, 1.0 is normal, 8.0 is basically instant
 * @param blendOutSpeed The speed at which the animation blends out. Lower is slower and higher is faster, 1.0 is normal, 8.0 is basically instant
 * @param duration The duration of the animation in milliseconds. -1 will play the animation until canceled
 * @param flag The animation flags (see enum)
 * @param playbackRate The playback rate (between 0.0 and 1.0)
 */
global.TaskPlayAnim = function (ped, animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, lockX, lockY, lockZ) {
	return _in(0x00000000, 0x5ab552c6, ped, _ts(animDictionary), _ts(animationName), _fv(blendInSpeed), _fv(blendOutSpeed), duration, flag, _fv(playbackRate), lockX, lockY, lockZ);
};

/**
 * Similar in functionality to [`TASK_PLAY_ANIM`](#\_0xEA47FE3719165B94), except the position and rotation parameters let you specify the initial position and rotation of the task. The ped is teleported to the position specified.
 * [Animations list](https://alexguirre.github.io/animations-list/)
 * @param ped The ped you want to play the animation
 * @param animDictionary The animation dictionary
 * @param animationName The animation name
 * @param posX Initial X position of the task
 * @param posY Initial Y position of the task
 * @param posZ Initial Z position of the task
 * @param rotX Initial X rotation of the task
 * @param rotY Initial Y rotation of the task
 * @param rotZ Initial Z rotation of the task
 * @param blendInSpeed The speed at which the animation blends in. Lower is slower and higher is faster, 1.0 is normal, 8.0 is basically instant
 * @param blendOutSpeed The speed at which the animation blends out. Lower is slower and higher is faster, 1.0 is normal, 8.0 is basically instant
 * @param duration The duration of the animation in milliseconds. -1 will play the animation until canceled
 * @param flag See [`TASK_PLAY_ANIM`](#\_0xEA47FE3719165B94)
 * @param animTime Value between 0.0 and 1.0, lets you start an animation from the given point
 */
global.TaskPlayAnimAdvanced = function (ped, animDictionary, animationName, posX, posY, posZ, rotX, rotY, rotZ, blendInSpeed, blendOutSpeed, duration, flag, animTime, p14, p15) {
	return _in(0x00000000, 0x3ddeb0e6, ped, _ts(animDictionary), _ts(animationName), _fv(posX), _fv(posY), _fv(posZ), _fv(rotX), _fv(rotY), _fv(rotZ), _fv(blendInSpeed), _fv(blendOutSpeed), duration, flag, _fv(animTime), p14, p15);
};

/**
 * TASK_REACT_AND_FLEE_PED
 */
global.TaskReactAndFleePed = function (ped, fleeTarget) {
	return _in(0x00000000, 0x8a632bd8, ped, fleeTarget);
};

/**
 * Firing Pattern Hash Information: https://pastebin.com/Px036isB
 */
global.TaskShootAtCoord = function (ped, x, y, z, duration, firingPattern) {
	return _in(0x00000000, 0x601c22e3, ped, _fv(x), _fv(y), _fv(z), duration, _ch(firingPattern));
};

/**
 * //this part of the code is to determine at which entity the player is aiming, for example if you want to create a mod where you give orders to peds
 * Entity aimedentity;
 * Player player = PLAYER::PLAYER_ID();
 * PLAYER::_GET_AIMED_ENTITY(player, &aimedentity);
 * //bg is an array of peds
 * TASK::TASK_SHOOT_AT_ENTITY(bg[i], aimedentity, 5000, MISC::GET_HASH_KEY("FIRING_PATTERN_FULL_AUTO"));
 * in practical usage, getting the entity the player is aiming at and then task the peds to shoot at the entity, at a button press event would be better.
 * Firing Pattern Hash Information: https://pastebin.com/Px036isB
 */
global.TaskShootAtEntity = function (entity, target, duration, firingPattern) {
	return _in(0x00000000, 0xac0631c9, entity, target, duration, _ch(firingPattern));
};

/**
 * ```
 * NativeDB Introduced: v323
 * ```
 * Warp a ped into a vehicle.
 * **Note**: It's better to use [`TASK_ENTER_VEHICLE`](#\_0xC20E50AA46D09CA8) with the flag "warp" flag instead of this native.
 * @param ped The Ped to be warped into the vehicle.
 * @param vehicle The target vehicle into which the ped will be warped.
 * @param seatIndex See eSeatPosition declared in [`IS_VEHICLE_SEAT_FREE`](#\_0x22AC59A870E6A669).
 */
global.TaskWarpPedIntoVehicle = function (ped, vehicle, seatIndex) {
	return _in(0x00000000, 0x65d4a35d, ped, vehicle, seatIndex);
};

/**
 * TEMP_BAN_PLAYER
 */
global.TempBanPlayer = function (playerSrc, reason) {
	return _in(0x00000000, 0x1e35dbba, _ts(playerSrc), _ts(reason));
};

/**
 * The backing function for TriggerClientEvent.
 */
global.TriggerClientEventInternal = function (eventName, eventTarget, eventPayload, payloadLength) {
	return _in(0x00000000, 0x2f7a49e6, _ts(eventName), _ts(eventTarget), _ts(eventPayload), payloadLength);
};

/**
 * The backing function for TriggerEvent.
 */
global.TriggerEventInternal = function (eventName, eventPayload, payloadLength) {
	return _in(0x00000000, 0x91310870, _ts(eventName), _ts(eventPayload), payloadLength);
};

/**
 * The backing function for TriggerLatentClientEvent.
 */
global.TriggerLatentClientEventInternal = function (eventName, eventTarget, eventPayload, payloadLength, bps) {
	return _in(0x00000000, 0x70b35890, _ts(eventName), _ts(eventTarget), _ts(eventPayload), payloadLength, bps);
};

/**
 * VERIFY_PASSWORD_HASH
 */
global.VerifyPasswordHash = function (password, hash) {
	return _in(0x00000000, 0x2e310acd, _ts(password), _ts(hash), _r);
};

/**
 * Returns whether or not the currently executing event was canceled.
 * @return A boolean.
 */
global.WasEventCanceled = function () {
	return _in(0x00000000, 0x58382a19, _r);
};


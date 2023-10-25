use std::ops::Add;

#[cfg(not(feature = "library"))]
// coreum deps
// use coreum_wasm_sdk::assetft;
use coreum_wasm_sdk::core::CoreumMsg;

use cosmwasm_std::{entry_point, to_binary};
use cosmwasm_std::{Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::state::{Seeker, SEEKER, PROFILES, Profile, Location, Roles, PROFILES_SEQ};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:social-experts-contract";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response<CoreumMsg>, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    let owner = msg
        .owner
        .and_then(|addr_string| deps.api.addr_validate(addr_string.as_str()).ok())
        .unwrap_or(info.sender);

    let seeker = Seeker {
        owner: owner.clone(),
        profiles: vec![],
    };
    SEEKER.save(deps.storage, &seeker)?;

    PROFILES_SEQ.save(deps.storage, &0u64)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", owner))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response<CoreumMsg>, ContractError> {
    match msg {
        ExecuteMsg::NewProfile {
            min_salary,
            location,
            roles,
            skills,
            active,
        } => execute_new_profile(deps, info, min_salary, location, roles, skills, active),
        ExecuteMsg::UpdateProfile {
            id,
            min_salary,
            location,
            roles,
            skills,
            active
        } => execute_update_profile(deps, info, id, min_salary, location, roles, skills, active),
        ExecuteMsg::DeleteProfile { id } => execute_delete_profile(deps, info, id),
    }
}

pub fn execute_new_profile(
    deps: DepsMut,
    info: MessageInfo,
    min_salary: u64,
    location: Location,
    roles: Vec<Roles>,
    skills: Vec<String>,
    active: bool,
) -> Result<Response<CoreumMsg>, ContractError> {
    let seeker = SEEKER.load(deps.storage)?;
    let id = PROFILES_SEQ.update::<_, cosmwasm_std::StdError>(deps.storage, |id| Ok(id.add(1)))?;

    let profile = Profile {
        id,
        min_salary,
        location,
        roles,
        skills,
        active,
    };

    PROFILES.save(deps.storage, id, &profile)?;

    let mut profiles = seeker.profiles;
    profiles.push(profile);

    let updated_seeker = Seeker {
        owner: seeker.owner,
        profiles,
    };
    SEEKER.save(deps.storage, &updated_seeker)?;

    Ok(Response::new()
        .add_attribute("method", "execute_new_profile")
        .add_attribute("owner", info.sender)
        .add_attribute("profile", id.to_string()))
}

pub fn execute_update_profile(
    deps: DepsMut,
    info: MessageInfo,
    id: u64,
    min_salary: Option<u64>,
    location: Option<Location>,
    roles: Option<Vec<Roles>>,
    skills: Option<Vec<String>>,
    active: Option<bool>,
) -> Result<Response<CoreumMsg>, ContractError> {
    let seeker = SEEKER.load(deps.storage)?;

    let mut profile = PROFILES.load(deps.storage, id)?;

    if seeker.owner != info.sender {
        return Err(ContractError::Unauthorized {});
    }

    if let Some(min_salary) = min_salary {
        profile.min_salary = min_salary;
    }

    if let Some(location) = location {
        profile.location = location;
    }

    if let Some(roles) = roles {
        profile.roles = roles;
    }

    if let Some(skills) = skills {
        profile.skills = skills;
    }

    if let Some(active) = active {
        profile.active = active;
    }

    PROFILES.save(deps.storage,id, &profile)?;

    Ok(Response::new()
        .add_attribute("method", "execute_update_profile")
        .add_attribute("owner", info.sender)
        .add_attribute("updated_profile", profile.id.to_string()))
}

pub fn execute_delete_profile(
    deps: DepsMut,
    info: MessageInfo,
    id: u64,
) -> Result<Response<CoreumMsg>, ContractError> {
    let seeker = SEEKER.load(deps.storage)?;

    if seeker.owner != info.sender {
        return Err(ContractError::Unauthorized {});
    }

    PROFILES.remove(deps.storage, id);
    Ok(Response::new()
        .add_attribute("method", "execute_delete_profile")
        .add_attribute("owner", info.sender)
        .add_attribute("deleted_profile", id.to_string()))
}


#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, _msg: QueryMsg) -> StdResult<Binary> {
    to_binary("OK")
}

#[cfg(test)]
mod tests {}

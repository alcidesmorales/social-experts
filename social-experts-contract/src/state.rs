use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::{Item, Map};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Seeker {
    // The public address of the job seeker
    pub owner: Addr,

    // List of profiles
    pub profiles: Vec<Profile>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Profile {
    pub id: u64,
    // What's the minimum salary you're willing to earn
    pub min_salary: u64,

    // Where do you want to work?
    pub location: Location,

    // What roles fit you?
    pub roles: Vec<Roles>,

    // What are your top skills?
    pub skills: Vec<String>,

    // Is this profile active?
    pub active: bool,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Roles {
    // What's the name of the role?
    pub name: String,

    // What's the minimum experience you have in this role?
    pub experience: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum Location {
    Any,
    Remote,
    Office,
    Hybrid,
}

pub const SEEKER: Item<Seeker> = Item::new("seeker");
pub const PROFILES: Map<&[u8], Profile> = Map::new("profiles");

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::state::{Location, Roles};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub owner: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    NewProfile {
        min_salary: u64,
        location: Location,
        roles: Vec<Roles>,
        skills: Vec<String>,
        active: bool,
    },
    UpdateProfile {
        id: u64,
        min_salary: Option<u64>,
        location: Option<Location>,
        roles: Option<Vec<Roles>>,
        skills: Option<Vec<String>>,
        active: Option<bool>,
    },
    DeleteProfile {
        id: u64,
    },    
}

// {
//     "new_profile": {
//         "min_salary": 100000,
//         "location": "remote",
//         "roles": [
//             {
//                 "name": "Software Engineer",
//                 "experience": 5
//             }
//         ],
//         "skills": [
//             "Rust",
//             "Go",
//             "JavaScript"
//         ],
//         "active": true
//     }
// }

// {
//     "update_profile": {
//         "id": 1,
//         "location": "hybrid",
//         "roles": [
//             {
//                 "name": "Software Engineer",
//                 "experience": 5
//             }, 
//             {
//                 "name": "DevOps Engineer",
//                 "experience": 3
//             }
//         ],
//         "skills": [
//             "Rust",
//             "Go",
//             "JavaScript",
//              "Docker",
//              "Kubernetes"
//         ],
//         "active": true
//     }

// {
//     "delete_profile": {
//         "id": 1
//     }
// }

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    QueryProfile {
        id: u64,
    },
    QueryProfileList {
        start_after: Option<u64>,
        limit: Option<u32>,
    },    
}

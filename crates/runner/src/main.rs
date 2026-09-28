use std::process::ExitCode;

fn main() -> ExitCode {
    match std::env::args().nth(1).as_deref() {
        Some("--version") => {
            println!("teloforge-runner {}", env!("CARGO_PKG_VERSION"));
            ExitCode::SUCCESS
        }
        Some("capabilities") => {
            println!(
                r#"{{"stage":"scaffold","protocol":"{}","execution":false,"supervision":false,"durable_spool":false}}"#,
                teloforge_protocol::PROTOCOL_VERSION
            );
            ExitCode::SUCCESS
        }
        None | Some("--help") | Some("-h") => {
            println!("Teloforge runner scaffold\nUsage: teloforge-runner [--version | capabilities]\nAgent execution is not implemented.");
            ExitCode::SUCCESS
        }
        Some(_) => {
            eprintln!("Unsupported command. No provider processes are started by this scaffold.");
            ExitCode::from(2)
        }
    }
}

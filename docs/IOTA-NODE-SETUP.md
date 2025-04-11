
# IOTA Node Setup for UBX Recharge System

This document provides instructions for setting up and configuring an IOTA Hornet Node to enable the UBX recharge functionality in the application.

## System Requirements

- Ubuntu 20.04 LTS or later (recommended)
- At least 4GB RAM
- 50GB+ SSD storage
- Stable internet connection
- Properly configured firewall

## Installation Methods

### Option 1: Docker Setup (Recommended)

1. Install Docker and Docker Compose:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. Create Docker Compose configuration:

```bash
mkdir -p ~/iota-hornet
cd ~/iota-hornet

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3'
services:
  hornet:
    container_name: hornet
    image: gohornet/hornet:latest
    restart: always
    stop_grace_period: 5m
    volumes:
      - ./config.json:/app/config.json:ro
      - ./profiles.json:/app/profiles.json:ro
      - ./p2pstore:/app/p2pstore
      - ./database:/app/database
      - ./snapshots:/app/snapshots
    ports:
      - "14265:14265/tcp"  # REST API
      - "14626:14626/tcp"  # Dashboard
      - "14267:14267/tcp"  # MQTT over WebSockets
      - "15600:15600/tcp"  # Gossip (autopeering)
    environment:
      - HORNET_TOOL_ENABLE_AUTOPEERING=true
EOF

# Create config.json with appropriate settings
cat > config.json << 'EOF'
{
  "restAPI": {
    "bindAddress": "0.0.0.0:14265",
    "jwtAuth": true,
    "publicRoutes": [
      "healthz",
      "mqtt",
      "api/routes"
    ],
    "protectedRoutes": [
      "api/*"
    ],
    "whitelistedAddresses": [
      "127.0.0.1",
      "::1"
    ],
    "excludeHealthCheckFromAuth": true,
    "permitRemoteAccess": true,
    "cors": {
      "allowedOrigins": [
        "https://lovable.dev"
      ]
    }
  },
  "dashboard": {
    "bindAddress": "0.0.0.0:14626",
    "auth": {
      "sessionTimeout": "72h",
      "username": "admin",
      "passwordHash": "set_secure_password_hash_here",
      "passwordSalt": "set_secure_salt_here"
    }
  },
  "mqtt": {
    "bindAddress": "0.0.0.0:14267"
  },
  "p2p": {
    "bindMultiAddresses": [
      "/ip4/0.0.0.0/tcp/15600",
      "/ip6/::/tcp/15600"
    ],
    "excludePeers": [],
    "reconnectInterval": "30s",
    "autopeering": {
      "bindAddress": "0.0.0.0:14626",
      "entryNodes": [
        "/dns/entry-mainnet.tanglebay.com/udp/14626/autopeering/iot4By8R5WaFX5F1mSrLccb5wiHwvsyKmvS4CnxQrCL"
      ]
    }
  },
  "logger": {
    "level": "info",
    "disableCaller": true,
    "encoding": "console",
    "outputPaths": [
      "stdout"
    ]
  },
  "db": {
    "engine": "rocksdb",
    "path": "database"
  }
}
EOF
```

3. Generate secure password hash and salt for the dashboard:

```bash
# Generate password hash and salt - replace with the output in config.json
docker run --rm gohornet/hornet:latest tool pwd-hash --json
```

4. Update the `config.json` file with appropriate CORS settings, whitelisted addresses, and password hash/salt values.

5. Start the Hornet node:

```bash
docker-compose up -d
```

### Option 2: Native Installation

1. Follow the official IOTA Hornet installation guide: https://wiki.iota.org/hornet/getting_started/

2. Configure the node with settings similar to the Docker setup above.

## Setup Verification

1. Check if the node is running:

```bash
# For Docker setup
docker logs -f hornet

# For native setup
journalctl -fu hornet.service
```

2. Access the dashboard at `https://your-server-ip:14626`

3. Verify API access:

```bash
curl -X GET "https://your-server-ip:14265/api/v1/info" -H "accept: application/json"
```

## Edge Function Integration

1. Set the environment variables in your Supabase project:

```
IOTA_NODE_URL=https://your-server-ip:14265
IOTA_NODE_API_KEY=your_generated_api_key
```

2. Test the IOTA integration via the Edge Function:

```bash
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/iota-service/generate-address" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"user_id":"SAMPLE_USER_ID"}'
```

## Security Recommendations

1. **Firewall Configuration**
   - Allow only necessary ports (14265, 14626, 14267, 15600)
   - Restrict dashboard access to trusted IPs

2. **API Key Management**
   - Generate strong API keys
   - Regularly rotate keys
   - Use environment variables for sensitive information

3. **Privacy Measures**
   - Configure minimal logging
   - Don't store user IP addresses
   - Use one-time addresses for each recharge session

## Monitoring and Maintenance

1. Set up monitoring for the node health:

```bash
# Install Node Exporter for Prometheus
docker run -d --name node-exporter --restart unless-stopped \
  -p 9100:9100 \
  -v "/:/hostfs:ro" \
  -v "/proc:/hostproc:ro" \
  prom/node-exporter
```

2. Configure regular database pruning to maintain performance.

3. Set up automated backups for the node database.

4. Create an alert system for node synchronization issues.

## Troubleshooting

- Check node logs for errors
- Verify network connectivity
- Ensure the node is fully synchronized
- Check firewall settings if connections are being refused


# UberEscorts Architecture Documentation

## Overview

The UberEscorts ecosystem is built on a foundation of interconnected core systems that work together to provide a comprehensive platform. This document outlines the architecture, connections between modules, and best practices for development.

## Core Systems

### UberCore

The central coordinator of all systems. It initializes and manages the lifecycle of other core components.

### Hermes

Handles user flow dynamics, routing, and tracking user journeys through the platform.

### Oxum

Manages the global pricing system, ensuring consistent pricing and transaction handling.

### Orus

Provides security services, session validation, and integrity checking.

### Lucie

Delivers AI capabilities, content moderation, and neural processing features.

## System Integration

The core systems are tightly integrated through the following mechanisms:

1. **HermesOrusOxum** - A unified integration layer that ensures proper communication between Hermes, Orus, and Oxum.

2. **RouteRegistry** - Centralized route management that prevents duplicate routes and broken links.

3. **SystemHealthChecker** - Monitors the health and connections between all systems.

## Best Practices

### Routing

- Always use the `routeRegistry` when defining routes
- Reference route paths using `AppPaths` constants
- Use `<NavLink>` components from the navigation system

### Core Systems Integration

- Initialize core systems in the correct order (UberCore → Hermes → Lucie → Oxum/Orus)
- Use the `trackNavigation` function to log user navigation
- Always validate user sessions with `validateUserSession`

### Component Development

- Keep components focused on a single responsibility
- Use the `UnifiedLayout` for consistency
- Follow the established folder structure

## Module Organization

```
src/
├── app/                # Application entry points
├── components/         # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── escorts/        # Escort-related components
│   ├── layout/         # Layout components
│   ├── navigation/     # Navigation components
│   └── ui/             # Base UI components
├── core/               # Core system implementations
│   ├── Hermes.ts
│   ├── Oxum.ts
│   ├── Orus.ts
│   ├── Lucie.ts
│   └── UberCore.ts
├── hooks/              # Custom React hooks
├── layouts/            # Page layout templates
├── pages/              # Page components
├── routes/             # Routing configuration
├── services/           # Service implementations
├── utils/              # Utility functions
│   ├── core/           # Core system utilities
│   ├── navigation/     # Navigation utilities
│   └── oxum/           # Oxum-specific utilities
└── contexts/           # React context providers
```

## System Connectivity

The UberEscorts ecosystem achieves superlative connectivity through:

1. **Centralized Route Registry** - All routes are defined in one place
2. **AppPaths Constants** - Consistent path references
3. **Navigation Components** - Unified navigation system
4. **Health Monitoring** - System health checker for detecting integration issues
5. **Core Integration Layer** - HermesOrusOxum provides unified access

## Dependency Graph

```
UberCore
├── Hermes
├── Oxum
├── Orus
└── Lucie

HermesOrusOxum
├── Hermes
├── Orus
└── Oxum

App
├── UberCore
└── Routes
    └── Pages
        ├── Components
        └── Services
            └── Core Systems
```

This architecture ensures a clean separation of concerns while maintaining tight integration between systems.

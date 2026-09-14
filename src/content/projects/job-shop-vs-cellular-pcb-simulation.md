---
title: "When Layout Matters: Using Simulation to Compare Job Shop and Cellular Manufacturing for PCB Production"
description: "A simulation-based comparison of job shop and cellular manufacturing layouts for PCB production, examining flow time, congestion, waiting zones, and resource allocation."
pubDate: 2026-09-14
tags: ["simulation", "bottleneck analysis", "production planning", "PCB"]
image: "/images/pcb.jpg"
draft: false
---

## Context

Simulation and Monte Carlo analysis are statistical techniques with big payoffs for decision-making in production and logistics. By running thousands of randomized scenarios, they let analysts test how a system behaves under uncertainty, quantify risk, and spot bottlenecks before making costly operational changes. Instead of relying on intuition or static calculations, simulation gives a dynamic view of how resources, queues, and workflows interact over time.

I used this approach to compare two alternative production layouts for printed-circuit-board (PCB) manufacturing: a traditional job shop and a cellular manufacturing system. The question was how each layout performs under identical operating conditions, and which bottlenecks most strongly affect order fulfillment.

### Why compare production layouts?

A production layout determines how work moves through a facility.

In a **job shop**, similar resources are grouped together, all assembly in one area, soldering in another, inspection in a third, and products follow different routes depending on their processing requirements. In **cellular manufacturing**, resources are organized into cells designed for a family of similar products, which can reduce movement and simplify coordination but may create dependency on a limited set of resources within each cell.

Neither layout is universally superior. Performance depends on product mix, processing requirements, resource availability, queue capacities, and arrival patterns. Simulation lets you test those interactions before committing to a layout in a real plant.

## Approach

I modeled both layouts for three PCB product types, P1, P2, and P3, and ran the experiment with **between 50 and 100 replications** per layout, using a **95% confidence-based stopping rule**. Confidence-interval widths stabilized after roughly 50 replications, so the estimates were robust enough for comparison.

The model kept operating assumptions deliberately simple:

- Employees available continuously, no shifts, breaks, or absences.
- Machines and employees of the same type have identical speed and efficiency.
- Shipping capacity is unlimited.
- Assembly, soldering, and inspection rooms cap out at 30 orders.
- Perfect real-time information with immediate resource reallocation.
- First-in, first-out queue rules.
- Waiting zones in front of the relevant production areas.

These assumptions isolate the structural differences between the two layouts, and they illustrate a core principle of simulation: results are only meaningful relative to the assumptions behind the model.

### Tools and methods

- **AnyLogic**, multi-method simulation environment.
- Monte Carlo simulation and randomized scenario runs.
- Confidence-based replication with 95% stopping rule.
- Moving-average analysis for system stability.
- Queue-capacity and bottleneck analysis.

## Results

The most visible difference was **average total flow time**, the time for a product to move through the system.

| Product | Job shop flow time | Cellular flow time |
|---|---|---|
| P1 | 48.87 minutes | 114.58 minutes |
| P2 | 0.00 minutes\* | 613.70 minutes |
| P3 | 64.80 minutes | 248.90 minutes |

\* A flow time of zero means no P2 jobs were completed in the simulated job shop scenario, not that P2 could be produced instantly.

For P1 and P3 the job shop was substantially faster: 48.87 vs 114.58 minutes for P1, and 64.80 vs 248.90 for P3. Cellular's P2 result (≈613.70 minutes) points to heavy congestion in the main waiting area and limited access to P2's required resources.

### Where the time actually went

Reported processing, waiting, and transport times were only a tiny slice of total flow time, roughly 1.5–3% for the job shop and below 1.5% for cellular. That doesn't mean waiting and transport were unimportant; it means the system-level flow-time measure was capturing delays from congestion, blocking, and job movement that a small per-area average hides. For operational decisions you must look at maximums, queue lengths, variability, and completed-job counts, not just averages.

### Congestion builds over time

Cellular's warm-up analysis was the clearest warning sign. P1's moving-average flow time climbed from **32.06 minutes** at the first departure to **114.58 minutes** by the fourth:

- Departure 1: 32.06 → Departure 2: 75.26 → Departure 3: 103.28 → Departure 4: 114.58.

The upward pattern means congestion accumulated throughout the simulation window, the cellular system never reached a stable operating state. This is where simulation beats a single average: the average says "slow," the moving average says *why*, here, a persistent imbalance between incoming work and available capacity.

### Waiting zones as hidden bottlenecks

In the job shop, queues spread across assembly, soldering, and inspection, roughly **30 waiting spaces each**. In cellular, congestion concentrated in the main cell waiting area, reaching approximately **100 entities**, while other areas stayed nearly empty.

That concentration created a structural bottleneck: even with machines free, jobs waited while downstream resources fell behind. Buffer sizing should therefore start from:

- ~30 waiting spaces at key job shop stations.
- ≥30 spaces in the Cell 1 assembly and inspection areas.
- ~100 spaces in the main cellular waiting area.

These are starting values for this modeled demand, not universal rules, real buffer sizing also weighs physical space, inventory cost, safety requirements, variability, and service levels.

### Are the resources sufficient?

Depends on the layout. The job shop had enough capacity for P1 and P3, but its total failure to process P2 shows a system can look strong on average while failing an entire product type. Cellular had the bigger problem: long flow times, rising moving averages, and a ~100-entity central queue suggest personnel and capacity, especially in the main cell, were insufficient or poorly allocated for the mix.

### Recommended layout

For the modeled product mix, I recommend the **job shop**: lower flow times for P1 and P3, more distributed queues, better throughput, and less severe congestion. But the recommendation is conditional, P2 never completed in the job shop either, so its bottleneck must be investigated (longer runs, better scheduling logic, or added capacity at critical stations) before implementation.

Cellular shouldn't be dismissed outright. It may become competitive if its constraints are addressed, rebalancing personnel, expanding the main waiting area, revising batch and scheduling rules, adjusting buffers, and monitoring congestion dynamically. The issue wasn't that cellular manufacturing is inherently inferior; the simulated cellular system was poorly matched to this product mix and resource configuration.

## Reflection

The most valuable lesson: **layout decisions can't be judged on a single performance indicator**. Flow time, queue size, processing and transport time, utilization, product-specific throughput, and system stability all matter.

I also learned that bottlenecks are often *emergent*, the product of interactions between staffing, shared waiting space, scheduling, and process structure, not one visibly slow machine. And the zero P2 flow time taught me to question surprising results: it wasn't proof of perfect performance, it was a signal that P2 never completed and the scenario needed a closer look.

## The supply-chain bridge

This is production analytics applied exactly as it's used in supply-chain and manufacturing operations: simulation, statistical experimentation, and bottleneck analysis to inform production and logistics decisions. The same toolkit generalizes to warehouse layout, order-picking strategies, distribution-network design, and inventory policy, anywhere queues, capacity, and variability collide. For future work I'd extend the simulation horizon, trace the P2 failure to its root cause, and test alternative staffing and buffer-sizing policies under shifts, absences, and finite shipping capacity, turning a strong layout comparison into a full operational model.
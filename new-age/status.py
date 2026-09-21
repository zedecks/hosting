#!/usr/bin/env python3
"""
ZEDECK Hosting (New Age) — Modular Development Status & Roadmap CLI
Usage:
  python status.py              # Exibe o status geral de todas as fases
  python status.py -p <num>      # Exibe detalhes de uma fase específica (ex: -p 4)
  python status.py --pending    # Exibe apenas as próximas fases pendentes
  python status.py --completed  # Exibe apenas as fases já concluídas
  python status.py --web        # Abre a página de status no navegador local
"""

import os
import sys
import json
import argparse
import webbrowser

# Force UTF-8 on Windows standard streams
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass
    os.system('')  # Enable VT100 Escape Sequences on Windows cmd/powershell

CYAN = "\033[96m"
GREEN = "\033[92m"
YELLOW = "\033[93m"
WHITE = "\033[97m"
GRAY = "\033[90m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"

STATUS_DIR = os.path.dirname(os.path.abspath(__file__))
STATUS_FILE = os.path.join(STATUS_DIR, "status.json")


def load_status_data():
    """Load and parse the status.json roadmap file."""
    if not os.path.exists(STATUS_FILE):
        print(f"{YELLOW}[!] Arquivo {STATUS_FILE} não encontrado.{RESET}")
        sys.exit(1)
    with open(STATUS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def render_progress_bar(completed: int, total: int, length: int = 24) -> str:
    """Generate a high-visibility terminal progress bar."""
    ratio = completed / total if total > 0 else 0
    filled_len = int(length * ratio)
    bar = f"{CYAN}{'#' * filled_len}{GRAY}{'-' * (length - filled_len)}{RESET}"
    percent = int(ratio * 100)
    return f"[{bar}] {BOLD}{percent}%{RESET} ({completed}/{total} Fases Concluídas)"


def print_header(data: dict):
    """Print the stylized CLI header."""
    print()
    print(f"{CYAN}{BOLD}========================================================================{RESET}")
    print(f"{CYAN}{BOLD}         ZEDECK HOSTING — PAINEL DE CONTROLE DE ROADMAP                 {RESET}")
    print(f"{CYAN}{BOLD}========================================================================{RESET}")
    print(f"  {WHITE}{BOLD}Projeto:{RESET} {data.get('project', 'ZEDECK Hosting')}  |  {WHITE}{BOLD}Versão Atual:{RESET} {CYAN}{BOLD}{data.get('version', 'v0.2.5')}{RESET}")
    print(f"  {WHITE}{BOLD}Localhost:{RESET} {CYAN}http://localhost:1807/{RESET}  |  {WHITE}{BOLD}Dashboard:{RESET} {CYAN}http://localhost:1807/status.html{RESET}")
    print(f"{GRAY}  " + "-" * 68 + f"{RESET}")


def display_overview(data: dict, filter_status: str = None):
    """Display the full roadmap list with status markers and progress."""
    phases = data.get("phases", [])
    total = len(phases)
    completed = sum(1 for p in phases if p.get("status") == "completed")

    print_header(data)
    print(f"  {render_progress_bar(completed, total)}")
    print(f"{GRAY}  " + "-" * 68 + f"{RESET}")
    print()

    for item in phases:
        status = item.get("status", "pending")
        if filter_status and status != filter_status:
            continue

        p_id = item.get("id")
        p_phase = item.get("phase", f"Fase {p_id}")
        p_title = item.get("title", "")
        p_anchor = item.get("anchor", "")
        p_version = item.get("version", "")

        if status == "completed":
            badge = f"{GREEN}[ CONCLUIDO ]{RESET}"
            phase_label = f"{GREEN}{BOLD}{p_phase}:{RESET}"
        elif status == "in_progress":
            badge = f"{YELLOW}[ EM ANDAMENTO ]{RESET}"
            phase_label = f"{YELLOW}{BOLD}{p_phase}:{RESET}"
        else:
            badge = f"{GRAY}[ PENDENTE  ]{RESET}"
            phase_label = f"{WHITE}{BOLD}{p_phase}:{RESET}"

        print(f"  {phase_label:<10} {badge} {WHITE}{p_title}{RESET}")
        print(f"     {GRAY}|- Ancora: {CYAN}{p_anchor:<16}{GRAY} | Versao: {DIM}{p_version}{RESET}")

        deliverables = item.get("deliverables", [])
        if deliverables and status == "completed":
            for d in deliverables[:2]:
                print(f"     {GRAY}|   + {d}{RESET}")
        elif deliverables and status == "in_progress":
            for d in deliverables[:2]:
                print(f"     {GRAY}|   * {d}{RESET}")

        print(f"     {GRAY}+-------------------------------------------------------------{RESET}")
        print()

    print(f"{GRAY}  Dica: Execute '{CYAN}python status.py -p <numero>{GRAY}' para detalhes completos.{RESET}")
    print(f"{GRAY}  Dica: Execute '{CYAN}python status.py --web{GRAY}' para abrir o Dashboard no navegador.{RESET}")
    print()


def display_phase_details(data: dict, phase_num: int):
    """Display comprehensive details for a specific phase."""
    phases = data.get("phases", [])
    phase_item = next((p for p in phases if p.get("id") == phase_num), None)

    if not phase_item:
        print(f"{YELLOW}[!] Fase {phase_num} nao encontrada (Faixa disponivel: 1 a {len(phases)}).{RESET}")
        return

    print_header(data)
    status = phase_item.get("status", "pending")
    status_badge = f"{GREEN}[ CONCLUIDO ]{RESET}" if status == "completed" else (f"{YELLOW}[ EM ANDAMENTO ]{RESET}" if status == "in_progress" else f"{GRAY}[ PENDENTE ]{RESET}")

    print(f"  {CYAN}{BOLD}>> {phase_item.get('phase', f'Fase {phase_num}')}: {phase_item.get('title')}{RESET}")
    print(f"  {WHITE}Status:{RESET} {status_badge}  |  {WHITE}Versao Alvo:{RESET} {CYAN}{phase_item.get('version')}{RESET}  |  {WHITE}Ancora:{RESET} {CYAN}{phase_item.get('anchor')}{RESET}")
    print()
    print(f"  {WHITE}{BOLD}Descricao:{RESET}")
    print(f"  {GRAY}{phase_item.get('description')}{RESET}")
    print()
    print(f"  {WHITE}{BOLD}Entregaveis & Especificacoes:{RESET}")
    for idx, d in enumerate(phase_item.get("deliverables", []), start=1):
        mark = f"{GREEN}[x]{RESET}" if status == "completed" else f"{CYAN}[ ]{RESET}"
        print(f"    {mark} {WHITE}{d}{RESET}")
    print()


def main():
    parser = argparse.ArgumentParser(description="ZEDECK Hosting Roadmap Status Tracker")
    parser.add_argument("-p", "--phase", type=int, help="Numero da fase para inspecionar em detalhe (1 a 9)")
    parser.add_argument("--pending", action="store_true", help="Filtrar e exibir apenas fases pendentes")
    parser.add_argument("--completed", action="store_true", help="Filtrar e exibir apenas fases concluidas")
    parser.add_argument("--web", action="store_true", help="Abrir o painel web (status.html) no navegador")
    parser.add_argument("--json", action="store_true", help="Exportar os dados em formato JSON")

    args = parser.parse_args()
    data = load_status_data()

    if args.web:
        url = "http://localhost:1807/status.html"
        print(f"{CYAN}[*] Abrindo {url} no navegador...{RESET}")
        webbrowser.open(url)
        return

    if args.json:
        print(json.dumps(data, indent=2, ensure_ascii=False))
        return

    if args.phase:
        display_phase_details(data, args.phase)
    elif args.pending:
        display_overview(data, filter_status="pending")
    elif args.completed:
        display_overview(data, filter_status="completed")
    else:
        display_overview(data)


if __name__ == "__main__":
    main()

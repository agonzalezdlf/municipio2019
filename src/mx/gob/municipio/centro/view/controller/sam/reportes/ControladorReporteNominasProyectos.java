package mx.gob.municipio.centro.view.controller.sam.reportes;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mx.gob.municipio.centro.model.gateways.sam.GatewayOrdenDePagos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayReporteOPDetalle;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;
import mx.gob.municipio.centro.view.controller.sam.facturas.ControladorFacturas;

@Controller
@RequestMapping("/sam/reportes/lst_reporte_op_detalle.action")
public class ControladorReporteNominasProyectos extends ControladorBase {

	public final static  int VER_TODAS_LAS_UNIDADES = 25;
	private static Logger log = Logger.getLogger(ControladorFacturas.class.getName());
		
	@Autowired
	GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	GatewayOrdenDePagos gatewayOrdenDePagos;
	
	@Autowired
	GatewayReporteOPDetalle gatewayReporteOPDetalle;

	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;

	public ControladorReporteNominasProyectos(){
		
	}

	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public String requestGetControlador(Map<String, Object> modelo, HttpServletRequest request, HttpServletResponse response) {

		boolean privilegio = this.getPrivilegioEn(this.getSesion().getIdUsuario(), VER_TODAS_LAS_UNIDADES);
		String idUnidad = request.getParameter("cbUnidad") == null ? this.getSesion().getClaveUnidad() : request.getParameter("cbUnidad");
		Integer tipogasto = request.getParameter("cbotipogastoS") != null ? Integer.parseInt(request.getParameter("cbotipogastoS")) : 0;
		Integer idproyecto = request.getParameter("txtproyecto") != null ? Integer.parseInt(!request.getParameter("txtproyecto").toString().equals("") ? request.getParameter("txtproyecto").toString() : "0") : 0;
		String idpartida = request.getParameter("txtpartida") != null ? request.getParameter("txtpartida") : "";
		String cbostatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayOrdenDePagos.OP_ESTADO_NUEVA): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		String estatus=request.getParameter("cbostatus")==null ? Integer.toString(gatewayOrdenDePagos.OP_ESTADO_NUEVA): this.arrayToString(request.getParameterValues("cbostatus"),",");//Componente status
		Integer clv_capitulo = request.getParameter("cbocapitulo") != null ? Integer.parseInt(!request.getParameter("cbocapitulo").toString().equals("") ? request.getParameter("cbocapitulo").toString() : "0") : 0;
		String mes_OP = request.getParameter("cbomes") == null ? "0" : request.getParameter("cbomes");
		
		modelo.put("mes_OP", mes_OP);
		modelo.put("idUnidad", idUnidad);
		modelo.put("nombreUnidad", this.getSesion().getUnidad());
		modelo.put("idtipogasto", tipogasto);
		modelo.put("idproyecto", (idproyecto == 0 ? "" : idproyecto));
		modelo.put("idpartida", idpartida);
		modelo.put("idcapitulo", clv_capitulo);
		modelo.put("estatus", estatus);
		modelo.put("cbostatus",cbostatus);
		modelo.put("listadomovimientos", this.gatewayReporteOPDetalle.getreparametros(modelo));

		return "sam/reportes/lst_reporte_op_detalle.jsp";

	}

	@ModelAttribute("unidadesAdmiva")
	public List<Map<String, Object>> getUnidadesAdmivas() {
		return gatewayUnidadAdm.getUnidadAdmTodos();
	}

	@ModelAttribute("tipodeGasto")
	public List<Map<String, Object>> getTiposDeGasto() {
		return gatewayPlanArbit.getTipodeGasto();
	}

	@ModelAttribute("capitulos")
	public List<Map<String, Object>> getCapitulos() {
		return gatewayUnidadAdm.getCapitulos();
	}
}
